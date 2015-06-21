(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  var winHeight = $(window).height(),
      winWidth = $(window).width(),
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
        newWidth = $(window).width(),
        throttle = Math.abs(newHeight - winHeight) > 20;

    if (winWidth > 850 && newWidth <= 850) {
      throttle = true;
      winWidth = newWidth;
      bottomVal = -250;
    } else if (winWidth <= 850 && newWidth > 850) {
      throttle = true;
      winWidth = newWidth;
      bottomVal = -350;
    }

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
},{"./libs/flyweight":2,"./modules/clock":3,"./modules/facts":4,"./modules/overlay":5,"./modules/social":6}],2:[function(require,module,exports){
/**
 * The Flyweight Class
 */
/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 */
"use strict";

(function() {
  if (!window.console) {
    window.console = {};
  }
  // union of Chrome, FF, IE, and Safari console methods
  var m = [
    "log", "info", "warn", "error", "debug", "trace", "dir", "group",
    "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
    "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
  ];
  // define undefined methods as noops to prevent errors
  var func = function() {};
  for (var i = 0; i < m.length; i += 1) {
    if (!window.console[m[i]]) {
      window.console[m[i]] = func;
    }
  }
})();

(function (root, factory) {
  //eh i dunno about this.
  if (typeof exports !== 'undefined') {
    factory(root, exports, window.jQuery);
  } else {
    root.Flyweight = factory(root, {}, root.jQuery || root.$);
  }


})(this, function(root, Flyweight, $) {
  /**
   * The Flyweight "class" is just a function that makes sure it is being
   * called using the "new" keyword.
   * It takes one paramater, an optional name that defaults to "App."
   */
  Flyweight = function (name) {
    if(!(this instanceof Flyweight)) {
      return new Flyweight(name);
    }
    this.name = name || 'App';
    this.els = this.els || {};
  };

  // for browserify...
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      //exports = module.exports = Flyweight;
      module.exports = Flyweight;
    }
  }


  Flyweight.debug = false;

  //WRITE A LOG THAT CAN BE TURNED ON AND OFF
  var msg = Flyweight.msg = function (msg, type) {
    if (!type) { type = 'log'; }
    // if msgs turned on
    if (this.debug) {
      console[type](msg);
    }
  };

  var ns = Flyweight.ns = function (nsString) {
    var
      parts = nsString.split('.'),
      parent = this,
      i
    ;
    //strip redundant leading global
    if (parts[0] === this.name) {
      parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
      //create a property if it doesn't exist
      if (typeof parent[parts[i]] === "undefined") {
        parent[parts[i]] = {};
      }
      parent = parent[parts[i]];
    }
    return parent;
  };

  /**
   * Flyweight Prototype
   */
  // $.extend(Flyweight.prototype, {
  //   ns: ns,
  //   msg: msg
  // });

  /**
   * Module
   * [Static Constructor] Flyweight.Module.extend is a way to create modules
   * with shared properties.
   */
  var Module = Flyweight.Module = function(element, options) {

    if(!(this instanceof Module)) { return new Module(); }

    if (typeof this.name !== 'string') {
      Flyweight.msg('Module must have a name property', 'error');
      return;
    }

    Flyweight.msg('Creating a module named: ' + this.name, 'warn');
    var el = element || this.el || document,
        _this = this,
        moduleOptions = this.moduleOptions || {};

    if (!$(el).length) {
      Flyweight.msg('this el is no present, so module won\'t be initialized', 'warn');
      return;
    }

    $.extend(this, moduleOptions, options);
    this.$el = $(el);
    this.initialize();
    this.$el.on(this.name + '.actionsDelegated', $.proxy(this.onDelegated, this));
    this.delegateEvents();
  };

  // Use extend to add to the prototype because....(find a good reason)
  $.extend(Module.prototype, {
    debug: false,
    msg: msg,
    initialize: function () {
      Flyweight.msg('original init in debug mode', 'log');
    },
    onDelegated: function () {
      Flyweight.msg('original onDelegated in debug mode', 'log');
    },
    getName: function () {
      return this.name;
    },
    logName: function () {
      console.log(this.name);
    },
    undelegateEvents: function () {
      Flyweight.msg('undelegateEvents is being fired', 'warn');
      this.$el.off('.delegatedEvents.' + this.name);
      return this;
    },
    delegateEvents: function (events) {
      this.undelegateEvents();
      Flyweight.msg('delegateEvents is being fired', 'warn');
      if (!events && !(events = this.events)) { return; }
      var that = this;

      //sort through events
      $.each(events, function(eventTarget, method) {
        var parts = eventTarget.split(' '),
            _event = parts.shift() + '.delegatedEvents.' + that.name,
            _selector = parts.join(' ');
            // _selector = (typeof els[_target] === "string")? els[_target] : els[_target].selector;
        that.$el.on(_event, _selector, {context: that, selector: _selector}, that[method]);
      });
      //creates an event after elements and actions are processed
      // $(document).trigger(key + '.els.processed', els);
      if (!$.isEmptyObject(this.events)) {
        this.$el.trigger(this.name + ".actionsDelegated");
      }

      return this;
    }

  });

  /**
   * Router
   * Adapted from RouterRouter
   * by Jason Garber (http://sixtwothree.org)
   * Source code available at: https://github.com/jgarber623/RouterRouter
   */
  var Router = Flyweight.Router = function (options) {

    if(!(this instanceof Router)) { return new Router(); }
    this.options = typeof options !== "undefined" ? options : this;

    if (this.options.routes) {
      this.routes = this.options.routes;
    }

    this.location = window.location;
    this._bindRoutes();

  };

  var isType = function(obj, name) {
    return Object.prototype.toString.call(obj) === "[object " + name + "]";
  };

  var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g,
      namedParam = /(\(\?)?:\w+/g,
      optionalParam = /\((.*?)\)/g,
      splatParam = /\*\w+/g,
      routeStripper = /^[#\/]|\s+$/g,
      rootStripper = /^\/+|\/+$/g,
      pathStripper = /#.*$/,
      trailingSlash = /\/$/;

  $.extend(Router.prototype, {
    _bindRoutes: function() {
      if (this.routes) {
        var route,
            routes = []; //Object.keys(this.routes);

        $.each(this.routes, function (k, v) {
          routes.push(k);
        });

        while (typeof (route = routes.pop()) !== "undefined") {
          this.route(route, this.routes[route]);
        }
      }
    },

    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return $.map(params, function(param) {
        return param ? decodeURIComponent(param) : null;
      });
    },

    _getFragment: function(fragment) {
      return fragment.replace(routeStripper, "").replace(trailingSlash, "");
    },

    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function(match, optional) {
        return optional ? match : "([^/?]+)";
      }).replace(splatParam, "([^?]*?)");
      return new RegExp("^" + route + "(?:\\?([\\s\\S]*))?$");
    },

    route: function(route, name, callback) {
      if (!isType(route, "RegExp")) {
        route = this._routeToRegExp(route);
      }
      if (isType(name, "Function")) {
        callback = name;
        name = "";
      }
      if (!callback) {
        callback = this.options[name];
      }
      var fragment = this._getFragment(this.location.pathname);
      if (route.test(fragment)) {
        var args = this._extractParameters(route, fragment);
        if (isType(callback, "Function")) {
          callback.apply(this, args);
        }
      }
      return this;
    }

  });


  /**
   * History
   * Adapted from RouterRouter
   * by Jason Garber (http://sixtwothree.org)
   * Source code available at: https://github.com/jgarber623/RouterRouter
   */
  var History = Flyweight.History = function() {

    // hmmm?
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }

  };

  History.started = false;

  $.extend(History.prototype, {

    navigate: function (fragment, options) {

      if (!History.started) { return false; }
      if (!options || options === true) { options = {trigger: !!options}; }

      fragment = this.getFragment(fragment || '');

      var root = this.root;

      if (fragment === '' || fragment.charAt(0) === '?') {
        root = root.slice(0, -1) || '/';
      }

      var url = root + fragment;

      fragment = decodeURI(fragment.replace(pathStripper, ''));

      if (this.fragment === fragment) { return; }

      this.fragment = fragment;

      if (this._usePushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
      }

      if (options.trigger) { return this.loadUrl(fragment); }

    },

    checkUrl: function (e) {

      var current = this.getFragment();

      if (current === this.fragment) {
        return false;
      }

      this.loadUrl();

    },

    // atRoot: function() {
    //   var path = this.location.pathname.replace(/[^\/]$/, '$&/');
    //   return path === this.root && !this.getSearch();
    // },

    getFragment: function(fragment) {
      if (fragment === null || fragment === undefined) {
        fragment = this.getPath();
      }
      return fragment.replace(routeStripper, '');
    },

    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    getSearch: function() {
      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
      return match ? match[0] : '';
    },

    getPath: function() {
      var path = decodeURI(this.location.pathname + this.getSearch());
      var root = this.root.slice(0, -1);
      if (!path.indexOf(root)) { path = path.slice(root.length); }
      return path.charAt(0) === '/' ? path.slice(1) : path;
    },

    start: function(options) {
      if (History.started) { throw new Error('Flyweight.history has already been started'); }
      History.started = true;

      var _this = this;

      // initial configuration
      this.options          = $.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsPushState  = true; //!!this.options.pushState;
      this._hasPushState    = !!(this.history && this.history.pushState);
      this._usePushState    = this._wantsPushState && this._hasPushState;
      this.fragment         = this.getFragment();
      this.router           = this.options.router;

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      // Add a cross-platform `addEventListener` shim for older browsers.
      // Don't really need this...
      var addEventListener = window.addEventListener || function (eventName, listener) {
        return attachEvent('on' + eventName, listener);
      };

      // We only care about browsers with popstate
      // other browsers work the old fashioned page refresh way
      if (this._usePushState) {
        addEventListener('popstate', function (e) {
          _this.checkUrl.apply(_this, [e]);
        }, false);
      } else {
        return false;
      }

    },

    loadUrl: function (fragment) {

      var _this = this;
      fragment = this.fragment = this.getFragment(fragment);

      $.each(this.router.routes, function (route, callback) {

        var _route;
        if (!isType(route, "RegExp")) {
          _route = _this.router._routeToRegExp(route);
        }
        if (_route.test(_this.fragment)) {
          _this.router.route(route, callback);
        }

      });

    }

  });

  // Create the default Flyweight.history.
  Flyweight.history = new History();

  /**
   * Extend ripped off from backbone.js
   */
  var extend = function (protos, statics) {
    var parent = this,
        child;

    if (protos && protos.hasOwnProperty('constructor')) {
      child = protos.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    $.extend(child, parent, statics);

    var Surrogate = function(){
      this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    if (protos) { $.extend(child.prototype, protos); }
    child.__super__ = parent.prototype;

    return child;

  };

  Module.extend = Router.extend = extend;

  return Flyweight;

});

},{}],3:[function(require,module,exports){
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
},{"../libs/flyweight":2}],4:[function(require,module,exports){
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
        $this.addClass('is-on');
        self.buttonAnimation();
        self.button = 1;
      } else {
        $this.removeClass('is-on');
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
},{"../libs/flyweight":2}],5:[function(require,module,exports){
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
},{"../libs/flyweight":2}],6:[function(require,module,exports){
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

      message = message + " @ussoccer_wnt";
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
},{"../libs/flyweight":2}]},{},[1]);
