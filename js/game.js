'use strict';

let player = {
  name: 'Без имени',
  score: 0,
};

var draggedSymbol = null; // символ, который тянем
var draggedSymbolParentDiv = null; // родитель, откуда тянется символ

var result = null;

function symbolDragStart(EO) {
  EO = EO || window.event;
  draggedSymbol = EO.target;
  draggedSymbolParentDiv = EO.target.parentNode;
}

function symbolDragEnd(EO) {
  EO = EO || window.event;
  draggedSymbol = null;
}

function symbolDblClick(EO) {
  const expressionDiv = document.getElementById('math_expression');
  expressionDiv.appendChild(EO.target.cloneNode(true));
  checkExpression();
}

function checkExpression() {
  //если есть символ "равно" то считаем выражение
  if (/\=/.test(getExpr())) {
    let expression = getExpr()
      .join('')
      .match(/[0-9+-\/\*]+/)[0];
    result = eval(expression);
    //покажем кнопку "Проверить ответ"
    document.getElementById('check_answer').style.display = 'block';
  }
}

function mathExpressionDragOver(EO) {
  EO = EO || window.event;
  EO.preventDefault();
}

function mathExpressionDrop(EO, Div) {
  // добавлен символ в формуле
  var cloneSymbol = draggedSymbol.cloneNode(true); //сохраним его копию в общем списке цифр
  EO = EO || window.event;
  EO.preventDefault();
  if (draggedSymbol) {
    Div.appendChild(draggedSymbol);
  }
  checkExpression();
  if (draggedSymbolParentDiv.id !== 'math_signs') {
    //если тянули не знаки мат.операций, то вернем копию числа в исходный div
    draggedSymbolParentDiv.appendChild(cloneSymbol);
  }
  draggedSymbolParentDiv = null;
}

function checkAnswer() {
  if (result == readAnswer()) {
    player.score++;
    $('#right_modal').dialog('open');
  } else {
    $('#wrong_modal').dialog('open');
  }
}

function getExpr() {
  var expressionString = document.getElementById('math_expression');
  var str = [];
  expressionString.querySelectorAll('.symbol').forEach((el) => {
    str.push(el.alt);
  });
  return str;
}

function readAnswer() {
  let answer =
    getExpr()
      .join('')
      .match(/(\=)(\d+)/) || '';

  if (answer[2]) {
    return answer[2];
  } else {
    return null;
  }
}

function numbersDragOver(EO) {
  EO = EO || window.event;
  EO.preventDefault();
}

function numbersDrop(EO, Div) {
  EO = EO || window.event;
  EO.preventDefault();
  switch (draggedSymbol.alt) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      if (draggedSymbol.alt == '=') {
        document.getElementById('check_answer').style.display = 'none'; //спрячем кнопку "Проверить ответ"
      }
      Div.appendChild(draggedSymbol);
      break;
    default:
      draggedSymbol.parentNode.removeChild(draggedSymbol);
      break;
  }
}
