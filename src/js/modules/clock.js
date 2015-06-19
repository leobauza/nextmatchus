(function ($) {

  "use strict";

  var Flyweight = require('../libs/flyweight');

  /**
   * @doc module
   * @name Clock
   * @description
   * A sample fw module that uses Utils
   */
  var Clock = Flyweight.Module.extend({
    name: 'Clock',
    //el: 'body',
    moduleOptions: {
      //optionOne: 'my option default'
    },
    debug: false,
    initialize: function () {

      var self = this,
          numbers = [],
          timeData = $('.counter').data();
      /**
       * Grab this from PHP somehow....
       */
      self.timeDiff = {
        days: timeData.days,
        hours: [timeData.hourstens, timeData.hoursones],
        mins: [timeData.minstens, timeData.minsones],
        seconds: timeData.seconds
      };

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

      self.numbers = numbers; // numbers available everywhere;

      /**
       * Initialize the counter: Every second make changes
       */
      var count = self.timeDiff.seconds;
      (function clock () {
        //self.updateNumberBulbs(numbers[count]);
        self.updateSecondsBulbs(count);
        if (count === 1) {
          count = 60;
        } else {
          count -= 1;
        }
        setTimeout(function () {

          /**
           * Update seconds every second UNTIL the last SECOND
           * Start the update chain whenever a new minute starts
           */

          // do work
          if (count === 60) {
            /**
             * update chain
             * decides what to update
             */
            self.updateChain("mins", "minutes__ones", "minutes__tens");
          }

          //console.log(count);

          // update seconds bulbs
          //self.updateSecondsBulbs(count);

          // keep the clock running
          clock();

        }, 1000);

      })();


    },

    getTimeDiff: function () {
      var self = this;
      return self.timeDiff;
    },

    updateChain: function (timeKey, onesSelector, tensSelector) {

      var self = this,
          ones = self.timeDiff[timeKey][1] - 1,
          tens = self.timeDiff[timeKey][0] - 1;

      if (tens === -1 && ones === -1) {

        // start over is different for hours and minutes
        var startOver = [2, 3];
        if (timeKey === 'mins') {
          startOver = [5, 9];
        }

        self.updateNumberBulbs(startOver[0], '.' + tensSelector);
        self.updateNumberBulbs(startOver[1], '.' + onesSelector);
        self.timeDiff[timeKey][0] = startOver[0];
        self.timeDiff[timeKey][1] = startOver[1];

        if (timeKey === 'mins') {
          self.updateChain('hours', 'hours__ones', 'hours__tens');
        } else {
          var newDay = self.timeDiff.days - 1;
          if (newDay < 0) { return; }
          if (newDay === 0) {
            $('.counter__days').html("0 Days");
            // set flag that days are over!!
          } else if (newDay === 1) {
            $('.counter__days').html("1 Day");
          } else {
            $('.counter__days').html(newDay + " Days");
          }
        }

        return;

      }

      if (ones >= 0) {
        // Min Ones more than or equal to zero so just update minutes
        // Update self.timeDiff[timeKey][1] as well
        // self.timeDiff[timeKey][1]; // minute ones
        self.updateNumberBulbs(ones, '.' + onesSelector);
        self.timeDiff[timeKey][1] = ones;
        return;
      } else {
        // Min Ones is now 9 UNLESS we already passed the 9th minute
        self.updateNumberBulbs(9, '.' + onesSelector);
        // self.timeDiff[timeKey][1] = 9
        self.timeDiff[timeKey][1] = 9;
        // Min Tens gets updated to minus 1 UNLESS it is 0
        self.updateNumberBulbs(tens, '.' + tensSelector);
        // self.timeDiff[timeKey][0] = self.timeDiff[timeKey][0] - 1
        self.timeDiff[timeKey][0] = tens;
        return;
      }

    },

    updateSecondsBulbs: function (seconds) {

      var self = this,
          $second = $('.counter__seconds .counter__bulb[data-second="' + seconds + '"]');


      if (seconds === 1) {
        $('.counter__seconds .counter__bulb').addClass('on');
      } else {
        $second.removeClass('on');
      }
      self.timeDiff.seconds = seconds;

    },

    updateNumberBulbs: function (number, selector) {

      var self = this;

      /**
       * Go through all the bulbs in a given number
       */
      var $targetNumber = $(selector + ' .counter__bulb');
      $.each($targetNumber, function (k, v) {

        var $self = $(v),
            data = $self.data(),
            lat = data.lat,
            long = data.long,
            numberMatrix = self.numbers[number];

        /**
         * Use the long/lat data to decide what bulbs to turn on
         */
        if ($.inArray(long, numberMatrix[lat]) !== -1) {
          $self.addClass('on');
        } else {
          $self.removeClass('on');
        }


      });

    }

  });

  //Exports the page module for app.js to use
  module.exports = Clock;

})(jQuery);