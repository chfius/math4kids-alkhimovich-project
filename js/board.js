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
