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




function heightAdjustments() {

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

    var newHeight = $(window).height(),
        throttle = Math.abs(newHeight - winHeight) > 20;

    if (newHeight < 1000 && throttle) {
      diff = 1000 - newHeight;
      $('.ref-wrap').css({
        'bottom': (bottomVal - diff) + "px"
      });
      winHeight = newHeight;
    }

    if (newHeight > 1000 && throttle) {
      diff = newHeight - 1000;
      $('.ref-wrap').css({
        'bottom': (bottomVal + diff) + "px"
      });
      winHeight = newHeight;
    }

  });

}

setTimeout(function () {

  heightAdjustments();

}, 500);