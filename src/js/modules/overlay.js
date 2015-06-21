(function ($) {

  "use strict";

  var Flyweight = require('../libs/flyweight');

  /**
   * @doc module
   * @name Overlay
   * @description
   * A sample fw module that uses Utils
   */
  var Overlay = Flyweight.Module.extend({
    name: 'Overlay',
    //el: 'body',
    moduleOptions: {
      //optionOne: 'my option default'
    },
    debug: false,
    moving: false,
    initialize: function () {

    },

    openOverlay: function (e) {
      e.preventDefault();

      var self = e.data.context;

      if (self.moving) { return; }

      self.moving = true;

      $('.overlay').addClass('on');
      setTimeout(function () {
        $('.overlay').addClass('move');

      }, 50);

      setTimeout(function () {
        self.moving = false;
      }, 550);

    },

    closeOverlay: function (e) {

      var self = e.data.context;

      if (self.moving) { return; }

      self.moving = true;

      e.preventDefault();

      $('.overlay').removeClass('move');
      setTimeout(function () {
        $('.overlay').removeClass('on');
      }, 500);

      setTimeout(function () {
        self.moving = false;
      }, 550);

    },

    events: {
      "click .overlay__close": "closeOverlay",
      "click .info-link": "openOverlay"
    }

  });

  //Exports the page module for app.js to use
  module.exports = Overlay;

})(jQuery);