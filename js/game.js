'use strict';

let player = {
  name: 'John Doe',
  score: 0,
};

var draggedSymbol = null; // символ, который тянем
var draggedSymbolParentDiv = null; // родитель, откуда тянется символ

var result = null;

function clickPlay() {
  //валидация на существование имени
  let nameExist = true;
  do {
    player.name = prompt('Ваше имя') || 'Без имени';
    player.score = 0;
    if (player.name in players.names) {
      nameExist = confirm('Такое имя уже есть! Перезаписать?');
    }
  } while (!nameExist);

  //создаем нового игрока с начальным кол-вом очков
  players.addName(player.name, player.score);

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
    //покажем кнопку "Проверить ответ"
    document.getElementById('check_answer').style.display = 'block';
  }
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
    board.newGame();
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
  return getExpr().join('').match(/(\=)(\d)/)[2];
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
