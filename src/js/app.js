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