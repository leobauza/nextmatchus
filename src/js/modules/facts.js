(function ($) {

  "use strict";

  var Flyweight = require('../libs/flyweight');

  /**
   * @doc module
   * @name Facts
   * @description
   * A sample fw module that uses Utils
   */
  var Facts = Flyweight.Module.extend({
    name: 'Facts',
    //el: 'body',
    moduleOptions: {
      //optionOne: 'my option default'
    },
    debug: false,
    moving: false,
    initialize: function () {
      var self = this;

      self.button = 0;
      self.animating = false;
    },

    toggleFacts: function (e) {

      e.preventDefault();
      var self = e.data.context,
          $this = $(this);

      if (self.animating) { return; }

      self.animating = true;

      if (self.button === 0) {
        self.buttonAnimation();
        self.button = 1;
      } else {
        self.buttonAnimation(true);
        self.button = 0;
      }

    },

    buttonAnimation: function (reverse, t) {

      var self = this,
          classes = (reverse)? ['do-rotate', 'do-collapse'] : ['do-collapse', 'do-rotate'],
          method = (reverse)? 'removeClass' : 'addClass',
          timeout = t || 250;

      if (!reverse) {
        $('.match-facts span')[method]('do-disappear');
      }
      $('.match-facts span')[method](classes[0]);

      setTimeout(function () {
        $('.match-facts span')[method](classes[1]);
        if (reverse) {
          $('.match-facts span')[method]('do-disappear');
        }
        self.toggleDropdown(reverse, t);
      }, timeout);

      /**
       * Wait for BOTH animations to finish!
       */
      setTimeout(function () {
        self.animating = false;
      }, (timeout * 2));

    },

    toggleDropdown: function (reverse, t) {

      var self = this,
          classes = (reverse)? ['do-translate', 'do-show'] : ['do-show', 'do-translate'],
          method = (reverse)? 'removeClass' : 'addClass',
          timeout = t || 250;

      if (!reverse) {
        timeout = 10;
      }

      $('.facts__dropdown')[method](classes[0]);

      setTimeout(function () {
        $('.facts__dropdown')[method](classes[1]);
      }, timeout);

    },

    events: {
      "click .match-facts a": "toggleFacts",
    }

  });

  //Exports the page module for app.js to use
  module.exports = Facts;

})(jQuery);