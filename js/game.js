'use strict';

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

function mathExpressionDragOver(EO) {
  EO = EO || window.event;
  // по-умолчанию ронять элементы в div запрещено, отменяем
  EO.preventDefault();
}

function mathExpressionDrop(EO, Div) {
  // добавлен символ в формуле
  var cloneSymbol = draggedSymbol.cloneNode(true);
  EO = EO || window.event;
  EO.preventDefault();
  if (draggedSymbol) {
    Div.appendChild(draggedSymbol);
  }
  //если последний символ "равно" то считаем выражение
  if (draggedSymbol.alt == '=') {
    result = evalExpr();
    document.getElementById('check_answer').style.display = 'block'; //покажем кнопку "Проверить ответ"
  }
  if (draggedSymbolParentDiv.id !== 'math_signs') {
    //если тянули не знаки мат.операций, то вернем копию числа в исходный div
    draggedSymbolParentDiv.appendChild(cloneSymbol);
  }
  draggedSymbolParentDiv = null;
}

function checkAnswer() {
  if (result == readAnswer()) {
    alert('Правильно!');
  } else {
    alert('Ошибка!');
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

function evalExpr() {
  var expr = getExpr();
  expr.pop(); //уберем в строке знак "равно"
  return eval(expr.join(''));
}

function readAnswer() {
  var answ = getExpr();
  var index = answ.indexOf('=') + 1; //+1 нужен чтобы в строке не было знака =
  return parseInt(answ.slice(index).join('').toString());
}

function numbersDragOver(EO) {
  EO = EO || window.event;
  EO.preventDefault();
}

function numbersDrop(EO, Div) {
  EO = EO || window.event;
  EO.preventDefault();
switch (draggedSymbol.alt) {
  case '+','-','*','/','=':
    Div.appendChild(draggedSymbol);
    break;
  default:
    draggedSymbol.parentNode.removeChild(draggedSymbol);
    break;
}

  /*if (draggedSymbol) {
    draggedSymbol.parentNode.removeChild(draggedSymbol);
    //  Div.appendChild(draggedSymbol);
  }*/
  if (draggedSymbol.alt == '=') {
    document.getElementById('check_answer').style.display = 'none'; //спрячем кнопку "Проверить ответ"
  }
}
