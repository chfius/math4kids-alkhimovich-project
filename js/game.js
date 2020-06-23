'use strict';

let player = {
  name:'John Doe',
  score:0,
};

var draggedSymbol = null; // символ, который тянем
var draggedSymbolParentDiv = null; // родитель, откуда тянется символ

var result = null;

function clickPlay() {
  //document.getElementById('math_expression').innerHTML = '';
  //location.reload();
  player.name = prompt('Ваше имя') || '';
  player.score = 0;
  //TODO: сделать валидацию на существование имени

  //создаем нового игрока с начальным кол-вом очков
  players.addName(player.name);
  players.names[player.name] = player.score;
  //нарисуем цифры, знаки и место для выражения
  board.newGame();
}

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
  //если символ "равно" то считаем выражение
  if (/\=/.test(getExpr()) /*draggedSymbol.alt == '='*/) {
    var expression = getExpr()
      .join('')
      .match(/([0-9)([+-\/\*]+)/)[0];
    result = eval(expression);
    //если не вычислиться, значит выражение не верно составлено и кнопка не появиться
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
    //TODO: сюда вставить модалку правильного ответа
    alert('Правильно!');
  } else {
    //TODO: сюда вставить модалку ошибочного ответа
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
