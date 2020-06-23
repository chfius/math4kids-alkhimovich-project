'use strict';

const hashAjaxName = 'ALKHIMOVICH_MATH4KIDS_';

var AjaxHandlerScript = 'http://fe.it-academy.by/AjaxStringStorage2.php';
var UpdatePassword;

let players = {
  names: {},  
  init() {
    //выполняется один раз при инициализации
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'INSERT',
        n: hashAjaxName + this.names,
        v: JSON.stringify(this.storage),
      },
      cache: false,
      success: function (response) {
        console.log(response);
      },
      error: this.errorHandler,
    });
  },
  load() {},
};

TAjaxStorage.prototype.getStorageInfo = function () {
  var that = this;
  $.ajax({
    url: AjaxHandlerScript,
    type: 'POST',
    data: {
      f: 'READ',
      n: this.address,
    },
    cache: false,
    success: function (response) {
      if (response.result) {
        var result = JSON.parse(response.result);
        that.storage = result;
      } else {
        that.storage = {};
      }
    },
    error: that.errorHandler,
  });
};

TAjaxStorage.prototype.addValue = function (name, info) {
  this.storage[name] = info;
  this.unlockStorageInfo();
};

TAjaxStorage.prototype.deleteValue = function (name) {
  if (this.storage[name]) {
    delete this.storage[name];
  }
  this.unlockStorageInfo();
};

TAjaxStorage.prototype.unlockStorageInfo = function () {
  var password = '123d';
  var that = this;
  $.ajax({
    url: AjaxHandlerScript,
    type: 'POST',
    data: {
      f: 'LOCKGET',
      n: this.address,
      p: password,
    },
    cache: false,
    success: function () {
      $.ajax({
        url: AjaxHandlerScript,
        type: 'POST',
        data: {
          f: 'UPDATE',
          n: that.address,
          p: password,
          v: JSON.stringify(that.storage),
        },
        cache: false,
        error: that.errorHandler,
      });
    },
    error: this.errorHandler,
  });
};

TAjaxStorage.prototype.getKeys = function () {
  return Object.keys(this.storage);
};

TAjaxStorage.prototype.errorHandler = function () {
  console.log('Ошибка!');
};
