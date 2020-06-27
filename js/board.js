'use strict';

let board = {
  newGame() {
    //----------- построение секции "Играть" -----------
    //здесь поле выражения-формулы
    const gameSection = document.getElementById('game');
    gameSection.innerHTML = '';
    const divBoard = document.createElement('div');
    divBoard.setAttribute('class', 'board_field');
    const divMathExpr = document.createElement('div');
    divMathExpr.setAttribute('class', 'math_expression');
    divMathExpr.setAttribute('id', 'math_expression');
    divMathExpr.setAttribute('ondrop', 'game.mathExpressionDrop(event,this)');
    divMathExpr.setAttribute('ondragover', 'game.mathExpressionDragOver(event)');
    divBoard.appendChild(divMathExpr);
    gameSection.appendChild(divBoard);

    //кнопка "проверить ответ"
    const divCheckBtn = document.createElement('div');
    divCheckBtn.setAttribute('class', 'button');
    divCheckBtn.setAttribute('id', 'check_answer');
    divCheckBtn.setAttribute('onclick', 'game.checkAnswer()');
    divCheckBtn.innerHTML = 'Проверить ответ';
    gameSection.appendChild(divCheckBtn);

    //цирфы
    const divNumbers = document.createElement('div');
    divNumbers.setAttribute('class', 'numbers');
    divNumbers.setAttribute('id', 'numbers');
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
    $('.numbers').attr('ondrop', 'game.numbersDrop(event,this)');
    $('.numbers').attr('ondragover', 'game.numbersDragOver(event)');
    $('.symbol').attr('ondragstart', 'game.symbolDragStart(event)');
    $('.symbol').attr('ondragend', 'game.symbolDragEnd(event)');
    //и на двойной клик
    $('.symbol').attr('ondblclick', 'game.symbolDblClick(event)');

    //добавим модалки
    const rightModal = document.createElement('div');
    rightModal.id = 'right_modal';
    rightModal.title = 'Правильно!';
    rightModal.innerHTML = 'Продолжить решать примеры?';
    gameSection.appendChild(rightModal);

    $('#right_modal').dialog({
      autoOpen: false, // окно создаётся скрытым
      modal: true, // модальное окно
      draggable: false, // не перетаскивать
      resizable: false, // не менять размер
      buttons: [
        { text: 'Да', click: continueBtn },
        { text: 'Нет', click: finishBtn },
      ],
    });

    function continueBtn() {
      board.newGame();
      $(this).dialog('close');
    }

    function finishBtn() {
      players.names[player.name] = player.score;
      player = {};
      $(this).dialog('close');
    }

    const wrongModal = document.createElement('div');
    wrongModal.id = 'wrong_modal';
    wrongModal.title = 'Ошибка!';
    wrongModal.innerHTML = 'Неверный ответ!';
    gameSection.appendChild(wrongModal);

    $('#wrong_modal').dialog({
      autoOpen: false, // окно создаётся скрытым
      modal: true, // модальное окно
      draggable: false, // не перетаскивать
      resizable: false, // не менять размер
      buttons: [
        {
          text: 'OK',
          click: function () {
            $(this).dialog('close');
          },
        },
      ],
    });
  },
  showBestPlayers() {
    let sectionBestPlayers = document.getElementById('best');
    sectionBestPlayers.innerHTML = '';

    let tablePlayers = document.createElement('table');
    tablePlayers.setAttribute('class', 'best_results');

    let tableHeader = document.createElement('tr');
    //создадим шапку таблицы
    let tableColName = document.createElement('td');
    tableColName.innerHTML = 'Имя';
    tableHeader.appendChild(tableColName);
    let tableColResult = document.createElement('td');
    tableColResult.innerHTML = 'Результат';
    tableHeader.appendChild(tableColResult);
    tablePlayers.appendChild(tableHeader);

    //наполним таблицу
    for (let name in players.names) {
      let tableCol = document.createElement('tr');
      let tableColName = document.createElement('td');
      tableColName.innerHTML = name;
      tableCol.appendChild(tableColName);
      let tableColResult = document.createElement('td');
      tableColResult.innerHTML = players.names[name];
      tableCol.appendChild(tableColResult);
      tablePlayers.appendChild(tableCol);
    }

    sectionBestPlayers.appendChild(tablePlayers);
  },
  initBoard() {
    //добавим модалку добавления пользователя
    const gameSection = document.getElementById('game');
    const userNameDiv = document.createElement('div');
    userNameDiv.id = 'user_name';
    userNameDiv.title = 'Имя игрока';
    userNameDiv.innerHTML = 'Введите ваше имя';
    const inputUserName = document.createElement('input');
    inputUserName.id = 'input_user_name';
    userNameDiv.appendChild(inputUserName);
    gameSection.appendChild(userNameDiv);
    $('#user_name').dialog({
      autoOpen: false, // окно создаётся скрытым
      modal: true, // модальное окно
      draggable: false, // не перетаскивать
      resizable: false, // не менять размер
      buttons: [{ text: 'OK', click: clickOkBtn }],
      beforeClose: (event, ui) => {
        return checkChanges();
      },
    });

    function clickOkBtn() {
      $(this).dialog('close');
      player.name = $('#input_user_name').val();
      player.score = 0;
      players.addName(player.name, player.score);
      board.newGame();
    }

    function checkChanges(e, ui) {
      return $('#input_user_name').val() ? true : false;
    }
    //отрисуем доску с правилами и учебой
    this.drawRules(), this.drawStudy();
  },
  drawRules() {
    const rulesSection = document.getElementById('rules');
    const boardDiv = document.createElement('div');
    boardDiv.classList = 'board_field';
    const rulesText = document.createElement('p');
    rulesText.classList = 'rules_text';
    $.ajax('txt/rules.txt', {
      type: 'GET',
      dataType: 'text',
      success: (data) => {
        rulesText.innerHTML = data;
      },
      error: (jqXHR, StatusStr, ErrorStr) => {
        console.log(StatusStr + ' ' + ErrorStr);
      },
    });
    boardDiv.appendChild(rulesText);
    rulesSection.appendChild(boardDiv);
  },
  drawStudy() {
    const studySection = document.getElementById('study');
    const boardDiv = document.createElement('div');
    boardDiv.classList = 'board_field';
    $.ajax('txt/study.html', {
      type: 'GET',
      dataType: 'html',
      success: (data) => {
        boardDiv.innerHTML = data;
      },
      error: (jqXHR, StatusStr, ErrorStr) => {
        console.log(StatusStr + ' ' + ErrorStr);
      },
    });
    studySection.appendChild(boardDiv);
  },
};

// ---------- SPA ---------------
window.onhashchange = switchToStateFromUrlHash;

function switchToStateFromUrlHash() {
  let page = window.location.hash.substr(1);
  if (page === '') {
    page = 'game';
  }

  switch (page) {
    case 'game':
      $('#game').show('slow');
      $('#rules').hide('slow');
      $('#study').hide('slow');
      $('#best').hide('slow');
      break;
    case 'rules':
      $('#game').hide('slow');
      $('#rules').show('slow');
      $('#study').hide('slow');
      $('#best').hide('slow');
      break;
    case 'study':
      $('#game').hide('slow');
      $('#rules').hide('slow');
      $('#study').show('slow');
      $('#best').hide('slow');
      break;
    case 'best':
      $('#game').hide('slow');
      $('#rules').hide('slow');
      $('#study').hide('slow');
      $('#best').show('slow');
      break;
    default:
      $('#game').show('slow');
      $('#rules').hide('slow');
      $('#study').hide('slow');
      $('#best').hide('slow');
      break;
  }
}
switchToStateFromUrlHash();

$(document).ready(() => {
  //после загрузки:
  //добавим звуки к пунктам меню
  let soundLink = document.getElementById('menu_sound');
  $('.menu_item').mouseenter(() => {
    soundLink.play();
  });
  /* ниже слушатели на JS, выше тоже, но с помощью jQuery
  let menu_items = document.querySelectorAll('.menu_item');
  menu_items.forEach((elem) =>
    elem.addEventListener('mouseenter', () => {
      soundLink.play();
    }),
  );*/

  //загрузим Ajax'ом пользвателей
  players.load();
  //наполним страницы Правила и Учеба
  board.initBoard();
});

$('#bestBtn').click(() => {
  //страница лучших пользователей
  //players.names = {}; <----очистка хранилища
  //players.updateNames();
  board.showBestPlayers();
});

//здесь покажем другой вариант модалки
//если раскомментировать строку, то сработает вариант jQuery
$('#playBtn').click(() => {
  //$('#user_name').dialog('open');
  $.MessageBox({
    input: true,
    message: 'Ваше имя?',
  }).done((data) => {
    if ($.trim(data)) {
      $.MessageBox('Привет, <b>' + data + '</b>!');
      player.name = data;
    } else {
      $.MessageBox("Пусть будет 'Без имени'...");
      player.name = 'Без имени';
    }
    player.score = 0;
    players.addName(player.name, player.score);
    board.newGame();
  });
});
