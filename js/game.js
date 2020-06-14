'use strict';

var draggedSymbol = null;
var result = null;

function symbolDragStart(EO) {
  EO = EO || window.event;
  draggedSymbol = EO.target;
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
  EO = EO || window.event;
  EO.preventDefault();
  if (draggedSymbol) {
    Div.appendChild(draggedSymbol);
  }
  //если последний символ = то считаем выражение
  if (draggedSymbol.alt == '=') {
    result = evalExpr();
  }
  //если выражение высчитано, то смотрим ответ
  if (result == readAnswer()) {
    console.log('You are right!');
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
  if (draggedSymbol) {
    Div.appendChild(draggedSymbol);
  }
}
