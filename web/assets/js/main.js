!function t(e,n,o){function i(a,r){if(!n[a]){if(!e[a]){var d="function"==typeof require&&require;if(!r&&d)return d(a,!0);if(s)return s(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[a]={exports:{}};e[a][0].call(c.exports,function(t){var n=e[a][1][t];return i(n?n:t)},c,c.exports,t,e,n,o)}return n[a].exports}for(var s="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){"use strict";function o(){var t=$(".main__header").outerHeight(),e=$(window).width();$(".ref-wrap").css(e>850?{top:t+50+"px"}:{top:t+15+"px"}),$(window).resize(function(){var t=$(".main__header").outerHeight(),n=$(window).width();e>850&&850>n&&$(".ref-wrap").css({top:t+15+"px"}),850>=e&&n>850&&$(".ref-wrap").css({top:t+50+"px"}),e=n})}{var i=(t("./libs/flyweight"),t("./modules/facts")),s=t("./modules/clock"),a=t("./modules/overlay"),r=t("./modules/social"),d=(new i,new s);new a,new r(document,{clock:d})}setTimeout(function(){o()},500)},{"./libs/flyweight":2,"./modules/clock":3,"./modules/facts":4,"./modules/overlay":5,"./modules/social":6}],2:[function(t,e,n){"use strict";!function(){window.console||(window.console={});for(var t=["log","info","warn","error","debug","trace","dir","group","groupCollapsed","groupEnd","time","timeEnd","profile","profileEnd","dirxml","assert","count","markTimeline","timeStamp","clear"],e=function(){},n=0;n<t.length;n+=1)window.console[t[n]]||(window.console[t[n]]=e)}(),function(t,e){"undefined"!=typeof n?e(t,n,window.jQuery):t.Flyweight=e(t,{},t.jQuery||t.$)}(this,function(t,o,i){o=function(t){return this instanceof o?(this.name=t||"App",void(this.els=this.els||{})):new o(t)},"undefined"!=typeof n&&"undefined"!=typeof e&&e.exports&&(e.exports=o),o.debug=!1;var s=o.msg=function(t,e){e||(e="log"),this.debug&&console[e](t)},a=(o.ns=function(t){var e,n=t.split("."),o=this;for(n[0]===this.name&&(n=n.slice(1)),e=0;e<n.length;e+=1)"undefined"==typeof o[n[e]]&&(o[n[e]]={}),o=o[n[e]];return o},o.Module=function(t,e){if(!(this instanceof a))return new a;if("string"!=typeof this.name)return void o.msg("Module must have a name property","error");o.msg("Creating a module named: "+this.name,"warn");var n=t||this.el||document,s=this.moduleOptions||{};return i(n).length?(i.extend(this,s,e),this.$el=i(n),this.initialize(),this.$el.on(this.name+".actionsDelegated",i.proxy(this.onDelegated,this)),void this.delegateEvents()):void o.msg("this el is no present, so module won't be initialized","warn")});i.extend(a.prototype,{debug:!1,msg:s,initialize:function(){o.msg("original init in debug mode","log")},onDelegated:function(){o.msg("original onDelegated in debug mode","log")},getName:function(){return this.name},logName:function(){console.log(this.name)},undelegateEvents:function(){return o.msg("undelegateEvents is being fired","warn"),this.$el.off(".delegatedEvents."+this.name),this},delegateEvents:function(t){if(this.undelegateEvents(),o.msg("delegateEvents is being fired","warn"),t||(t=this.events)){var e=this;return i.each(t,function(t,n){var o=t.split(" "),i=o.shift()+".delegatedEvents."+e.name,s=o.join(" ");e.$el.on(i,s,{context:e,selector:s},e[n])}),i.isEmptyObject(this.events)||this.$el.trigger(this.name+".actionsDelegated"),this}}});var r=o.Router=function(t){return this instanceof r?(this.options="undefined"!=typeof t?t:this,this.options.routes&&(this.routes=this.options.routes),this.location=window.location,void this._bindRoutes()):new r},d=function(t,e){return Object.prototype.toString.call(t)==="[object "+e+"]"},u=/[\-{}\[\]+?.,\\\^$|#\s]/g,c=/(\(\?)?:\w+/g,l=/\((.*?)\)/g,h=/\*\w+/g,f=/^[#\/]|\s+$/g,m=/^\/+|\/+$/g,p=/#.*$/,g=/\/$/;i.extend(r.prototype,{_bindRoutes:function(){if(this.routes){var t,e=[];for(i.each(this.routes,function(t,n){e.push(t)});"undefined"!=typeof(t=e.pop());)this.route(t,this.routes[t])}},_extractParameters:function(t,e){var n=t.exec(e).slice(1);return i.map(n,function(t){return t?decodeURIComponent(t):null})},_getFragment:function(t){return t.replace(f,"").replace(g,"")},_routeToRegExp:function(t){return t=t.replace(u,"\\$&").replace(l,"(?:$1)?").replace(c,function(t,e){return e?t:"([^/?]+)"}).replace(h,"([^?]*?)"),new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},route:function(t,e,n){d(t,"RegExp")||(t=this._routeToRegExp(t)),d(e,"Function")&&(n=e,e=""),n||(n=this.options[e]);var o=this._getFragment(this.location.pathname);if(t.test(o)){var i=this._extractParameters(t,o);d(n,"Function")&&n.apply(this,i)}return this}});var v=o.History=function(){"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)};v.started=!1,i.extend(v.prototype,{navigate:function(t,e){if(!v.started)return!1;e&&e!==!0||(e={trigger:!!e}),t=this.getFragment(t||"");var n=this.root;(""===t||"?"===t.charAt(0))&&(n=n.slice(0,-1)||"/");var o=n+t;return t=decodeURI(t.replace(p,"")),this.fragment!==t?(this.fragment=t,this._usePushState&&this.history[e.replace?"replaceState":"pushState"]({},document.title,o),e.trigger?this.loadUrl(t):void 0):void 0},checkUrl:function(t){var e=this.getFragment();return e===this.fragment?!1:void this.loadUrl()},getFragment:function(t){return(null===t||void 0===t)&&(t=this.getPath()),t.replace(f,"")},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getSearch:function(){var t=this.location.href.replace(/#.*/,"").match(/\?.+/);return t?t[0]:""},getPath:function(){var t=decodeURI(this.location.pathname+this.getSearch()),e=this.root.slice(0,-1);return t.indexOf(e)||(t=t.slice(e.length)),"/"===t.charAt(0)?t.slice(1):t},start:function(t){if(v.started)throw new Error("Flyweight.history has already been started");v.started=!0;var e=this;this.options=i.extend({root:"/"},this.options,t),this.root=this.options.root,this._wantsPushState=!0,this._hasPushState=!(!this.history||!this.history.pushState),this._usePushState=this._wantsPushState&&this._hasPushState,this.fragment=this.getFragment(),this.router=this.options.router,this.root=("/"+this.root+"/").replace(m,"/");var n=window.addEventListener||function(t,e){return attachEvent("on"+t,e)};return this._usePushState?void n("popstate",function(t){e.checkUrl.apply(e,[t])},!1):!1},loadUrl:function(t){var e=this;t=this.fragment=this.getFragment(t),i.each(this.router.routes,function(t,n){var o;d(t,"RegExp")||(o=e.router._routeToRegExp(t)),o.test(e.fragment)&&e.router.route(t,n)})}}),o.history=new v;var w=function(t,e){var n,o=this;n=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return o.apply(this,arguments)},i.extend(n,o,e);var s=function(){this.constructor=n};return s.prototype=o.prototype,n.prototype=new s,t&&i.extend(n.prototype,t),n.__super__=o.prototype,n};return a.extend=r.extend=w,o})},{}],3:[function(t,e,n){!function(n){"use strict";var o=t("../libs/flyweight"),i=o.Module.extend({name:"Clock",moduleOptions:{},debug:!1,initialize:function(){var t=this,e=[],o=n(".counter").data();t.timeDiff={days:o.days,hours:[o.hourstens,o.hoursones],mins:[o.minstens,o.minsones],seconds:o.seconds},t.stopNextOne=!1,e[0]={a:["a","b","c","d"],b:["a","d"],c:["a","d"],d:["a","d"],e:["a","d"],f:["a","d"],g:["a","b","c","d"]},e[1]={a:["d"],b:["d"],c:["d"],d:["d"],e:["d"],f:["d"],g:["d"]},e[2]={a:["a","b","c","d"],b:["d"],c:["d"],d:["a","b","c","d"],e:["a"],f:["a"],g:["a","b","c","d"]},e[3]={a:["a","b","c","d"],b:["d"],c:["d"],d:["a","b","c","d"],e:["d"],f:["d"],g:["a","b","c","d"]},e[4]={a:["a","d"],b:["a","d"],c:["a","d"],d:["a","b","c","d"],e:["d"],f:["d"],g:["d"]},e[5]={a:["a","b","c","d"],b:["a"],c:["a"],d:["a","b","c","d"],e:["d"],f:["d"],g:["a","b","c","d"]},e[6]={a:["a","b","c","d"],b:["a"],c:["a"],d:["a","b","c","d"],e:["a","d"],f:["a","d"],g:["a","b","c","d"]},e[7]={a:["a","b","c","d"],b:["d"],c:["d"],d:["d"],e:["d"],f:["d"],g:["d"]},e[8]={a:["a","b","c","d"],b:["a","d"],c:["a","d"],d:["a","b","c","d"],e:["a","d"],f:["a","d"],g:["a","b","c","d"]},e[9]={a:["a","b","c","d"],b:["a","d"],c:["a","d"],d:["a","b","c","d"],e:["d"],f:["d"],g:["d"]},t.numbers=e;var i=t.timeDiff.seconds;!function s(){0!==i&&(t.updateSecondsBulbs(i),1===i?i=60:i-=1,setTimeout(function(){60===i&&(0===t.timeDiff.days&&0===t.timeDiff.hours[0]&&0===t.timeDiff.hours[1]&&0===t.timeDiff.mins[0]&&0===t.timeDiff.mins[1]?(i=0,n(".counter__seconds .counter__bulb").removeClass("on"),n(".main__header h2").html('The <a href="#" class="do-tweet">#USWNT</a> Match vs Japan is on right now'),n(".ref").addClass("rapinoe"),n(".counter-wrap").addClass("flag"),n(".counter__days").remove()):t.updateChain("mins","minutes__ones","minutes__tens")),s()},1e3))}()},getTimeDiff:function(){var t=this;return t.timeDiff},updateChain:function(t,e,o){var i=this,s=i.timeDiff[t][1]-1,a=i.timeDiff[t][0]-1;{if(-1!==a||-1!==s)return s>=0?(i.updateNumberBulbs(s,"."+e),void(i.timeDiff[t][1]=s)):(i.updateNumberBulbs(9,"."+e),i.timeDiff[t][1]=9,i.updateNumberBulbs(a,"."+o),void(i.timeDiff[t][0]=a));var r=[2,3];if("mins"===t&&(r=[5,9]),i.updateNumberBulbs(r[0],"."+o),i.updateNumberBulbs(r[1],"."+e),i.timeDiff[t][0]=r[0],i.timeDiff[t][1]=r[1],"mins"===t)i.updateChain("hours","hours__ones","hours__tens");else{var d=i.timeDiff.days-1;if(0>d)return;n(".counter__days").html(0===d?"0 Days":1===d?"1 Day":d+" Days")}}},updateSecondsBulbs:function(t){var e=this,o=n('.counter__seconds .counter__bulb[data-second="'+t+'"]');1===t?n(".counter__seconds .counter__bulb").addClass("on"):o.removeClass("on"),e.timeDiff.seconds=t},updateNumberBulbs:function(t,e){var o=this,i=n(e+" .counter__bulb");n.each(i,function(e,i){var s=n(i),a=s.data(),r=a.lat,d=a["long"],u=o.numbers[t];-1!==n.inArray(d,u[r])?s.addClass("on"):s.removeClass("on")})}});e.exports=i}(jQuery)},{"../libs/flyweight":2}],4:[function(t,e,n){!function(n){"use strict";var o=t("../libs/flyweight"),i=o.Module.extend({name:"Facts",moduleOptions:{},debug:!1,moving:!1,initialize:function(){var t=this;t.button=0,t.animating=!1},toggleFacts:function(t){t.preventDefault();var e=t.data.context,o=n(this);e.animating||(e.animating=!0,0===e.button?(o.addClass("is-on"),e.buttonAnimation(),e.button=1):(o.removeClass("is-on"),e.buttonAnimation(!0),e.button=0))},buttonAnimation:function(t,e){var o=this,i=t?["do-rotate","do-collapse"]:["do-collapse","do-rotate"],s=t?"removeClass":"addClass",a=e||250;t||n(".match-facts span")[s]("do-disappear"),n(".match-facts span")[s](i[0]),setTimeout(function(){n(".match-facts span")[s](i[1]),t&&n(".match-facts span")[s]("do-disappear"),o.toggleDropdown(t,e)},a),setTimeout(function(){o.animating=!1},2*a)},toggleDropdown:function(t,e){var o=t?["do-translate","do-show"]:["do-show","do-translate"],i=t?"removeClass":"addClass",s=e||250;t||(s=10),n(".facts__dropdown")[i](o[0]),setTimeout(function(){n(".facts__dropdown")[i](o[1])},s)},events:{"click .match-facts a":"toggleFacts"}});e.exports=i}(jQuery)},{"../libs/flyweight":2}],5:[function(t,e,n){!function(n){"use strict";var o=t("../libs/flyweight"),i=o.Module.extend({name:"Overlay",moduleOptions:{},debug:!1,moving:!1,initialize:function(){},openOverlay:function(t){t.preventDefault();var e=t.data.context;e.moving||(e.moving=!0,n(".overlay").addClass("on"),setTimeout(function(){n(".overlay").addClass("move")},50),setTimeout(function(){e.moving=!1},550))},closeOverlay:function(t){var e=t.data.context;e.moving||(e.moving=!0,t.preventDefault(),n(".overlay").removeClass("move"),setTimeout(function(){n(".overlay").removeClass("on")},500),setTimeout(function(){e.moving=!1},550))},events:{"click .overlay__close":"closeOverlay","click .info-link":"openOverlay"}});e.exports=i}(jQuery)},{"../libs/flyweight":2}],6:[function(t,e,n){!function(n){"use strict";var o=t("../libs/flyweight"),i=o.Module.extend({name:"Social",moduleOptions:{clock:{}},debug:!1,initialize:function(){{var t=this;t.clock}},shareit:function(t){t.preventDefault();var e=t.data.context,n=e.clock,o=n.getTimeDiff(),i=e.createMessage(o);FB.ui({method:"feed",name:"When is the next #USWNT game?",link:"http://nextmatch.us",caption:i},function(t){console.log(t)})},tweetit:function(t){t.preventDefault();var e=t.data.context,n=e.clock,o=n.getTimeDiff(),i=e.createMessage(o,!0),s="",a="http://nextmatch.us";i+=" @ussoccer_wnt",s="https://twitter.com/share?url="+encodeURIComponent(a)+"&text="+i,e.openIntent(s,540,420)},createMessage:function(t,e){var n=t.days.toString(),o=t.hours.join("").replace(/^0+/,""),i=t.mins.join("").replace(/^0+/,""),s=t.seconds.toString().replace(/^0+/,""),a="";return""===o&&""===i&&""===s?(a="The #USWNT match is on right now! What are you doing? Go WATCH! #WomensWorldCup",encodeURIComponent(a)):(a="Only ","0"!==n&&(a+="1"===n?"1 day ":n+" days "),""!==o&&(console.log(o),a+="1"===o?"1 hour ":o+" hours "),""!==i&&(("60"===s||"0"===s)&&(a+="and "),a+="1"===i?"1 minute ":i+" minutes"),"0"!==s&&"60"!==s&&""!==s&&((""!==o||""!==i)&&(a+=" and "),a+="1"===s?"1 second":s+" seconds"),"60"===s&&""===o&&""===i&&(a+="60 seconds"),a+=" until the next #USWNT match!",a+=" #WomensWorldCup",e&&(a=encodeURIComponent(a)),a)},openIntent:function(t,e,n){var o=void 0!==window.screenLeft?window.screenLeft:screen.left,i=void 0!==window.screenTop?window.screenTop:screen.top,s=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,a=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,r=s/2-e/2+o,d=a/2-n/2+i,u=window.open(t,"","width="+e+",height="+n+", top="+d+", left="+r);u.focus()},events:{"click .do-share":"shareit","click .do-tweet":"tweetit"}});e.exports=i}(jQuery)},{"../libs/flyweight":2}]},{},[1]);