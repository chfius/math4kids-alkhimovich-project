'use strict';

let game = {
  draggedSymbol: null, // символ, который тянем
  draggedSymbolParentDiv: null, // родитель, откуда тянется символ
  result: null,
  symbolDragStart(EO) {
    EO = EO || window.event;
    this.draggedSymbol = EO.target;
    this.draggedSymbolParentDiv = EO.target.parentNode;
  },
  symbolDragEnd(EO) {
    EO = EO || window.event;
    this.draggedSymbol = null;
  },
  symbolDblClick(EO) {
    const expressionDiv = document.getElementById('math_expression');
    expressionDiv.appendChild(EO.target.cloneNode(true));
    this.checkExpression();
  },
  checkExpression() {
    //если есть символ "равно" то считаем выражение
    if (/\=/.test(this.getExpr())) {
      let expression = this.getExpr()
        .join('')
        .match(/[0-9+-\/\*]+/)[0];
      this.result = eval(expression);
      //покажем кнопку "Проверить ответ"
      document.getElementById('check_answer').style.display = 'block';
    }
  },
  mathExpressionDragOver(EO) {
    EO = EO || window.event;
    EO.preventDefault();
  },
  mathExpressionDrop(EO, Div) {
    // добавлен символ в формуле
    let cloneSymbol = this.draggedSymbol.cloneNode(true); //сохраним его копию в общем списке цифр
    EO = EO || window.event;
    EO.preventDefault();
    if (this.draggedSymbol) {
      Div.appendChild(this.draggedSymbol);
    }
    this.checkExpression();
    if (this.draggedSymbolParentDiv.id !== 'math_signs') {
      //если тянули не знаки мат.операций, то вернем копию числа в исходный div
      this.draggedSymbolParentDiv.appendChild(cloneSymbol);
    }
    this.draggedSymbolParentDiv = null;
  },
  checkAnswer() {
    if (this.result == this.readAnswer()) {
      player.score++;
      $('#right_modal').dialog('open');
    } else {
      $('#wrong_modal').dialog('open');
    }
  },
  getExpr() {
    let expressionString = document.getElementById('math_expression');
    let str = [];
    expressionString.querySelectorAll('.symbol').forEach((el) => {
      str.push(el.alt);
    });
    return str;
  },
  readAnswer() {
    let answer =
      this.getExpr()
        .join('')
        .match(/(\=)(\d+)/) || '';
    if (answer[2]) {
      return answer[2];
    } else {
      return null;
    }
  },
  numbersDragOver(EO) {
    EO = EO || window.event;
    EO.preventDefault();
  },
  numbersDrop(EO, Div) {
    EO = EO || window.event;
    EO.preventDefault();
    switch (this.draggedSymbol.alt) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        if (this.draggedSymbol.alt == '=') {
          document.getElementById('check_answer').style.display = 'none'; //спрячем кнопку "Проверить ответ"
        }
        Div.appendChild(this.draggedSymbol);
        break;
      default:
        this.draggedSymbol.parentNode.removeChild(this.draggedSymbol);
        break;
    }
  },
};
