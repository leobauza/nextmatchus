(function ($) {

  "use strict";

  var Flyweight = require('../libs/flyweight');

  /**
   * @doc module
   * @name CounterBoard
   * @description
   * A sample fw module that uses Utils
   */
  var CounterBoard = Flyweight.Module.extend({
    name: 'CounterBoard',
    //el: 'body',
    moduleOptions: {
      //optionOne: 'my option default'
    },
    debug: false,
    initialize: function () {

      var self = this,
          numbers = [];

      numbers[0] = {
        a: ["a", "b", "c", "d"],
        b: ["a", "d"],
        c: ["a", "d"],
        d: ["a", "d"],
        e: ["a", "d"],
        f: ["a", "d"],
        g: ["a", "b", "c", "d"]
      };

      numbers[1] = {
        a: ["d"],
        b: ["d"],
        c: ["d"],
        d: ["d"],
        e: ["d"],
        f: ["d"],
        g: ["d"]
      };

      numbers[2] = {
        a: ["a", "b", "c", "d"],
        b: ["d"],
        c: ["d"],
        d: ["a", "b", "c", "d"],
        e: ["a"],
        f: ["a"],
        g: ["a", "b", "c", "d"]
      };

      numbers[3] = {
        a: ["a", "b", "c", "d"],
        b: ["d"],
        c: ["d"],
        d: ["a", "b", "c", "d"],
        e: ["d"],
        f: ["d"],
        g: ["a", "b", "c", "d"]
      };

      numbers[4] = {
        a: ["a", "d"],
        b: ["a", "d"],
        c: ["a", "d"],
        d: ["a", "b", "c", "d"],
        e: ["d"],
        f: ["d"],
        g: ["d"]
      };

      numbers[5] = {
        a: ["a", "b", "c", "d"],
        b: ["a"],
        c: ["a"],
        d: ["a", "b", "c", "d"],
        e: ["d"],
        f: ["d"],
        g: ["a", "b", "c", "d"]
      };

      numbers[6] = {
        a: ["a", "b", "c", "d"],
        b: ["a"],
        c: ["a"],
        d: ["a", "b", "c", "d"],
        e: ["a", "d"],
        f: ["a", "d"],
        g: ["a", "b", "c", "d"]
      };

      numbers[7] = {
        a: ["a", "b", "c", "d"],
        b: ["d"],
        c: ["d"],
        d: ["d"],
        e: ["d"],
        f: ["d"],
        g: ["d"]
      };

      numbers[8] = {
        a: ["a", "b", "c", "d"],
        b: ["a", "d"],
        c: ["a", "d"],
        d: ["a", "b", "c", "d"],
        e: ["a", "d"],
        f: ["a", "d"],
        g: ["a", "b", "c", "d"]
      };

      numbers[9] = {
        a: ["a", "b", "c", "d"],
        b: ["a", "d"],
        c: ["a", "d"],
        d: ["a", "b", "c", "d"],
        e: ["d"],
        f: ["d"],
        g: ["d"]
      };


      /**
       * Initialize the counter: Every second make changes
       * @test
       *   1 day, 0 hours, 01 mins, 10 seconds
       */
      var timeDiff = {
            days: 1,
            hours: 0,
            mins: 1,
            seconds: 10
          },
          count = timeDiff.seconds;

      (function clock () {
        //self.toggleNumberBulbs(numbers[count]);
        self.toggleSecondsBulbs(count);
        if (count === 1) {
          count = 60;
        } else {
          count -= 1;
        }
        setTimeout(function () {
          /**
           * Subtract a second from the time and decide what numbers are affected
           * @example
           *   - 1 day 23 hours 59 mins 59 seconds: Take away one second and only
           *   the seconds counter is affected.
           *   - 1 day 00 hours 00 mins 00 seconds: Take away one second and
           *   seconds change to 59, minutes change to 59, hours change to 23,
           *   and days change to 0
           */

          // do work
          console.log(count);
          self.toggleSecondsBulbs(count);
          //self.toggleNumberBulbs(numbers[count]);
          clock();

        }, 1000);

      })();


    },


    toggleSecondsBulbs: function (seconds) {
      var self = this,
          $second = $('.counter__seconds .counter__bulb[data-second="' + seconds + '"]');

      if (seconds === 1) {
        $('.counter__seconds .counter__bulb').addClass('on');
      } else {
        $second.removeClass('on');
      }


    },

    toggleNumberBulbs: function (number) {

      var self = this;

      /**
       * Go through all the bulbs in a given counter number
       * @todo
       *   - Only do this to the counter numbers that need it in any
       *   given second that passes.
       */
      var $hoursTensRows = $('.hours__tens .counter__bulb');
      $.each($hoursTensRows, function (k, v) {

        var $self = $(v),
            data = $self.data(),
            lat = data.lat,
            long = data.long;

        /**
         * Use the long/lat data to decide what bulbs to turn on
         * @todo:
         *   - Dynamically pull in the appropriate number definition to use
         */
        if ($.inArray(long, number[lat]) !== -1) {
          $self.addClass('on');
        } else {
          $self.removeClass('on');
        }


      });

    },

    onDelegated: function (e) {

    },
    events: {
      // 'click p' : 'test'
    }
  });

  //Exports the page module for app.js to use
  module.exports = CounterBoard;

})(jQuery);