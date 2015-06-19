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
    initialize: function () {

    },

    openOverlay: function (e) {
      e.preventDefault();
      $('.overlay').addClass('on');
    },

    closeOverlay: function (e) {
      e.preventDefault();
      $('.overlay').removeClass('on');
    },

    events: {
      "click .overlay__close": "closeOverlay",
      "click .info-link": "openOverlay"
    }

  });

  //Exports the page module for app.js to use
  module.exports = Overlay;

})(jQuery);