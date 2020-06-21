'use strict';

window.onhashchange = switchToStateFromUrlHash;

function switchToStateFromUrlHash() {
  var page = window.location.hash.substr(1);
  if (page === '') {
    page = 'game';
  }

  switch (page) {
    case 'game':
      document.getElementById('game').style.display = 'block';
      document.getElementById('rules').style.display = 'none';
      document.getElementById('study').style.display = 'none';
      document.getElementById('best').style.display = 'none';
      break;
    case 'rules':
      document.getElementById('game').style.display = 'none';
      document.getElementById('rules').style.display = 'block';
      document.getElementById('study').style.display = 'none';
      document.getElementById('best').style.display = 'none';
      break;
    case 'study':
      document.getElementById('game').style.display = 'none';
      document.getElementById('rules').style.display = 'none';
      document.getElementById('study').style.display = 'block';
      document.getElementById('best').style.display = 'none';
      break;
    case 'best':
      document.getElementById('game').style.display = 'none';
      document.getElementById('rules').style.display = 'none';
      document.getElementById('study').style.display = 'none';
      document.getElementById('best').style.display = 'block';
      break;
    default:
      document.getElementById('game').style.display = 'block';
      document.getElementById('rules').style.display = 'none';
      document.getElementById('study').style.display = 'none';
      document.getElementById('best').style.display = 'none';
      break;
  }
}
switchToStateFromUrlHash();

function clickPlay() {
  document.getElementById('math_expression').innerHTML = '';
}

//----------- построение секции "Играть" -----------
//здесь поле выражения-формулы
const gameSection = document.getElementById('game');
const divBoard = document.createElement('div');
divBoard.setAttribute('class', 'board_field');
const divMathExpr = document.createElement('div');
divMathExpr.setAttribute('class', 'math_expression');
divMathExpr.setAttribute('id', 'math_expression');
divMathExpr.setAttribute('ondrop', 'mathExpressionDrop(event,this)');
divMathExpr.setAttribute('ondragover', 'mathExpressionDragOver(event)');
divBoard.appendChild(divMathExpr);
gameSection.appendChild(divBoard);

//кнопка "проверить ответ"
const divCheckBtn = document.createElement('div');
divCheckBtn.setAttribute('class', 'button');
divCheckBtn.setAttribute('id', 'check_answer');
divCheckBtn.setAttribute('onclick', 'checkAnswer()');
divCheckBtn.innerHTML = 'Проверить ответ';
gameSection.appendChild(divCheckBtn);

//цирфы
const divNumbers = document.createElement('div');
divNumbers.setAttribute('class', 'numbers');
divNumbers.setAttribute('id', 'numbers');
divNumbers.setAttribute('ondrop', 'numbersDrop(event,this)');
divNumbers.setAttribute('ondragover', 'numbersDragOver(event)');
for (let i = 0; i < 10; i++) {
  let img = document.createElement('img');
  img.setAttribute('class', 'symbol');
  img.setAttribute('src', `img/${i}.png`);
  img.style.order = `${i}`;
  img.setAttribute('alt', `${i}`);
  divNumbers.appendChild(img);
}
gameSection.appendChild(divNumbers);

//математические знаки
const divMathSign = document.createElement('div');
divMathSign.setAttribute('class', 'numbers math_sign');
divMathSign.setAttribute('id', 'math_signs');
divMathSign.setAttribute('ondrop', 'numbersDrop(event,this)');
divMathSign.setAttribute('ondragover', 'numbersDragOver(event)');
// +
const plus = document.createElement('img');
plus.setAttribute('class', 'symbol');
plus.setAttribute('src', 'img/plus.png');
plus.setAttribute('id', 'plus');
plus.setAttribute('alt', '+');
divMathSign.appendChild(plus);
// -
const minus = document.createElement('img');
minus.setAttribute('class', 'symbol');
minus.setAttribute('src', 'img/minus.png');
minus.setAttribute('id', 'minus');
minus.setAttribute('alt', '-');
divMathSign.appendChild(minus);
// *
const multiplic = document.createElement('img');
multiplic.setAttribute('class', 'symbol');
multiplic.setAttribute('src', 'img/multiplic.png');
multiplic.setAttribute('id', 'multiplic');
multiplic.setAttribute('alt', '*');
divMathSign.appendChild(multiplic);
// /
const division = document.createElement('img');
division.setAttribute('class', 'symbol');
division.setAttribute('src', 'img/division.png');
division.setAttribute('id', 'division');
division.setAttribute('alt', '/');
divMathSign.appendChild(division);
// =
const equal = document.createElement('img');
equal.setAttribute('class', 'symbol');
equal.setAttribute('src', 'img/equal.png');
equal.setAttribute('id', 'equal');
equal.setAttribute('alt', '=');
divMathSign.appendChild(equal);

gameSection.appendChild(divMathSign);

//с помощью JQuery повесим обработчиков Drag&Drop на класс symbol
$('.symbol').attr('ondragstart', 'symbolDragStart(event)');
$('.symbol').attr('ondragend', 'symbolDragEnd(event)');
