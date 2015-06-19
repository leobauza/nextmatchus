"use strict";

var Flyweight = require('./libs/flyweight'),
    Clock = require('./modules/clock'),
    Overlay = require('./modules/overlay'),
    Social = require('./modules/social');


var clock = new Clock();
var overlay = new Overlay();
var social = new Social(document, {
  clock: clock
});


var winHeight = $(window).height(),
    bottomVal = parseInt($('.ref-wrap').css('bottom')),
    diff = 0;

if (winHeight < 1000) {
  diff = 1000 - winHeight;
  $('.ref-wrap').css({
    'bottom': (bottomVal - diff) + "px"
  });
}

if (winHeight > 1000) {
  diff = winHeight - 1000;
  $('.ref-wrap').css({
    'bottom': (bottomVal + diff) + "px"
  });
}


$(window).resize(function () {

  var newHeight = $(window).height();

  if (newHeight < 1000) {
    diff = 1000 - newHeight;
    $('.ref-wrap').css({
      'bottom': (bottomVal - diff) + "px"
    });
  }

  if (newHeight > 1000) {
    diff = newHeight - 1000;
    $('.ref-wrap').css({
      'bottom': (bottomVal + diff) + "px"
    });
  }

});