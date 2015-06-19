(function ($) {

  "use strict";

  var Flyweight = require('../libs/flyweight');

  /**
   * @doc module
   * @name Social
   * @description
   * A sample fw module that uses Utils
   */
  var Social = Flyweight.Module.extend({
    name: 'Social',
    //el: 'body',
    moduleOptions: {
      clock: {}
      //optionOne: 'my option default'
    },
    debug: false,
    initialize: function () {

      var self = this,
          clock = self.clock;

    },

    shareit: function (e) {

      e.preventDefault();

      var self = e.data.context,
          clock = self.clock,
          timeDiff = clock.getTimeDiff(),
          message = self.createMessage(timeDiff);

      FB.ui({
        method: 'feed',
        name: "When is the next #USWNT game?",
        link: "http://nextmatch.us",
        caption: message,
      }, function(response){
        console.log(response);
      });

    },

    tweetit: function (e) {

      e.preventDefault();

      var self = e.data.context,
          clock = self.clock,
          timeDiff = clock.getTimeDiff(),
          message = self.createMessage(timeDiff, true),
          tweet = '',
          url = 'http://nextmatch.us';

      tweet = "https://twitter.com/share?url=" + encodeURIComponent(url) + "&text=" + message;

      self.openIntent(tweet, 540, 420);

    },

    createMessage: function (timeDiff, encode) {

      var days = timeDiff.days.toString(),
          hours = timeDiff.hours.join(''),
          mins = timeDiff.mins.join(''),
          seconds = timeDiff.seconds.toString(),
          message = '';

      message = "The #USWNT next match begins in ";
      message += (days === '1')? '1 day ' : days + " days ";
      message += (hours === '1')? '1 hour ' : hours + " hours ";
      message += (mins === '1')? '1 minute ' : mins + " minutes ";
      message += "and ";
      message += (seconds === '1')? '1 second' : seconds + " seconds";
      message += " #WomensWorldCup";
      if (encode) {
        message = encodeURIComponent(message);
      }

      return message;

    },

    openIntent: function (url, w, h) {

      var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left,
          dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top,
          width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
          height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
          left = ((width / 2) - (w / 2)) + dualScreenLeft,
          top = ((height / 2) - (h / 2)) + dualScreenTop;

      var theWindow = window.open(url, '', 'width=' + w + ',height=' + h + ', top=' + top + ', left=' + left);
          theWindow.focus();

    },

    events: {
      "click .do-share": "shareit",
      "click .do-tweet": "tweetit"
    }

  });

  //Exports the page module for app.js to use
  module.exports = Social;

})(jQuery);