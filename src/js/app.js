"use strict";

var Flyweight = require('./libs/flyweight'),
    Facts = require('./modules/facts'),
    Clock = require('./modules/clock'),
    Overlay = require('./modules/overlay'),
    Social = require('./modules/social');


var facts = new Facts();
var clock = new Clock();
var overlay = new Overlay();
var social = new Social(document, {
  clock: clock
});




function heightAdjustments() {

  var headerHeight = $('.main__header').outerHeight(),
      winWidth = $(window).width();


  if (winWidth > 850) {
    $('.ref-wrap').css({
      'top': headerHeight + 50 + 'px'
    });
  } else {
    $('.ref-wrap').css({
      'top': headerHeight + 10 + 'px'
    });
  }


  $(window).resize(function () {

    var newHeaderHeight = $('.main__header').outerHeight(),
        newWinWidth = $(window).width();


    if (winWidth > 850 && newWinWidth < 850) {
      $('.ref-wrap').css({
        'top': newHeaderHeight + 10 + 'px'
      });
    }

    if (winWidth <= 850 && newWinWidth > 850) {
      $('.ref-wrap').css({
        'top': newHeaderHeight + 50 + 'px'
      });
    }

    winWidth = newWinWidth;

  });

  // var winHeight = $(window).height(),
  //     winWidth = $(window).width(),
  //     bottomVal = parseInt($('.ref-wrap').css('bottom')),
  //     diff = 0;
  //
  // if (winHeight < 1000) {
  //   diff = 1000 - winHeight;
  //   $('.ref-wrap').css({
  //     'bottom': (bottomVal - diff) + "px"
  //   });
  // }
  //
  // if (winHeight > 1000) {
  //   diff = winHeight - 1000;
  //   $('.ref-wrap').css({
  //     'bottom': (bottomVal + diff) + "px"
  //   });
  // }
  //
  // $(window).resize(function () {
  //
  //   var newHeight = $(window).height(),
  //       newWidth = $(window).width(),
  //       throttle = Math.abs(newHeight - winHeight) > 20;
  //
  //   if (winWidth > 850 && newWidth <= 850) {
  //     throttle = true;
  //     winWidth = newWidth;
  //     bottomVal = -250;
  //   } else if (winWidth <= 850 && newWidth > 850) {
  //     throttle = true;
  //     winWidth = newWidth;
  //     bottomVal = -350;
  //   }
  //
  //   if (newHeight < 1000 && throttle) {
  //     diff = 1000 - newHeight;
  //     $('.ref-wrap').css({
  //       'bottom': (bottomVal - diff) + "px"
  //     });
  //     winHeight = newHeight;
  //   }
  //
  //   if (newHeight > 1000 && throttle) {
  //     diff = newHeight - 1000;
  //     $('.ref-wrap').css({
  //       'bottom': (bottomVal + diff) + "px"
  //     });
  //     winHeight = newHeight;
  //   }
  //
  // });

}

setTimeout(function () {

  heightAdjustments();

}, 500);