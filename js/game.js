'use strict';

var draggedSymbol = null;

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
    if (draggedSymbol)
        Div.appendChild(draggedSymbol);
    //если последний символ = то считаем выражение
    if (draggedSymbol.alt == "=") evalExpr();
}

function evalExpr() {
    var expressionString = document.getElementById('math_expression');
    var str = [];
    expressionString.querySelectorAll('.symbol').forEach((el) => { str.push(el.alt); });
    str.pop();
    //console.log(str.join('')); 
    console.log(eval(str.join('')))
}