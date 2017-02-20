(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright 2014 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * GATOR.JS
 * Simple Event Delegation
 *
 * @version 1.2.4
 *
 * Compatible with IE 9+, FF 3.6+, Safari 5+, Chrome
 *
 * Include legacy.js for compatibility with older browsers
 *
 *             .-._   _ _ _ _ _ _ _ _
 *  .-''-.__.-'00  '-' ' ' ' ' ' ' ' '-.
 * '.___ '    .   .--_'-' '-' '-' _'-' '._
 *  V: V 'vv-'   '_   '.       .'  _..' '.'.
 *    '=.____.=_.--'   :_.__.__:_   '.   : :
 *            (((____.-'        '-.  /   : :
 *                              (((-'\ .' /
 *                            _____..'  .'
 *                           '-._____.-'
 */
(function() {
    var _matcher,
        _level = 0,
        _id = 0,
        _handlers = {},
        _gatorInstances = {};

    function _addEvent(gator, type, callback) {

        // blur and focus do not bubble up but if you use event capturing
        // then you will get them
        var useCapture = type == 'blur' || type == 'focus';
        gator.element.addEventListener(type, callback, useCapture);
    }

    function _cancel(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * returns function to use for determining if an element
     * matches a query selector
     *
     * @returns {Function}
     */
    function _getMatcher(element) {
        if (_matcher) {
            return _matcher;
        }

        if (element.matches) {
            _matcher = element.matches;
            return _matcher;
        }

        if (element.webkitMatchesSelector) {
            _matcher = element.webkitMatchesSelector;
            return _matcher;
        }

        if (element.mozMatchesSelector) {
            _matcher = element.mozMatchesSelector;
            return _matcher;
        }

        if (element.msMatchesSelector) {
            _matcher = element.msMatchesSelector;
            return _matcher;
        }

        if (element.oMatchesSelector) {
            _matcher = element.oMatchesSelector;
            return _matcher;
        }

        // if it doesn't match a native browser method
        // fall back to the gator function
        _matcher = Gator.matchesSelector;
        return _matcher;
    }

    /**
     * determines if the specified element matches a given selector
     *
     * @param {Node} element - the element to compare against the selector
     * @param {string} selector
     * @param {Node} boundElement - the element the listener was attached to
     * @returns {void|Node}
     */
    function _matchesSelector(element, selector, boundElement) {

        // no selector means this event was bound directly to this element
        if (selector == '_root') {
            return boundElement;
        }

        // if we have moved up to the element you bound the event to
        // then we have come too far
        if (element === boundElement) {
            return;
        }

        // if this is a match then we are done!
        if (_getMatcher(element).call(element, selector)) {
            return element;
        }

        // if this element did not match but has a parent we should try
        // going up the tree to see if any of the parent elements match
        // for example if you are looking for a click on an <a> tag but there
        // is a <span> inside of the a tag that it is the target,
        // it should still work
        if (element.parentNode) {
            _level++;
            return _matchesSelector(element.parentNode, selector, boundElement);
        }
    }

    function _addHandler(gator, event, selector, callback) {
        if (!_handlers[gator.id]) {
            _handlers[gator.id] = {};
        }

        if (!_handlers[gator.id][event]) {
            _handlers[gator.id][event] = {};
        }

        if (!_handlers[gator.id][event][selector]) {
            _handlers[gator.id][event][selector] = [];
        }

        _handlers[gator.id][event][selector].push(callback);
    }

    function _removeHandler(gator, event, selector, callback) {

        // if there are no events tied to this element at all
        // then don't do anything
        if (!_handlers[gator.id]) {
            return;
        }

        // if there is no event type specified then remove all events
        // example: Gator(element).off()
        if (!event) {
            for (var type in _handlers[gator.id]) {
                if (_handlers[gator.id].hasOwnProperty(type)) {
                    _handlers[gator.id][type] = {};
                }
            }
            return;
        }

        // if no callback or selector is specified remove all events of this type
        // example: Gator(element).off('click')
        if (!callback && !selector) {
            _handlers[gator.id][event] = {};
            return;
        }

        // if a selector is specified but no callback remove all events
        // for this selector
        // example: Gator(element).off('click', '.sub-element')
        if (!callback) {
            delete _handlers[gator.id][event][selector];
            return;
        }

        // if we have specified an event type, selector, and callback then we
        // need to make sure there are callbacks tied to this selector to
        // begin with.  if there aren't then we can stop here
        if (!_handlers[gator.id][event][selector]) {
            return;
        }

        // if there are then loop through all the callbacks and if we find
        // one that matches remove it from the array
        for (var i = 0; i < _handlers[gator.id][event][selector].length; i++) {
            if (_handlers[gator.id][event][selector][i] === callback) {
                _handlers[gator.id][event][selector].splice(i, 1);
                break;
            }
        }
    }

    function _handleEvent(id, e, type) {
        if (!_handlers[id][type]) {
            return;
        }

        var target = e.target || e.srcElement,
            selector,
            match,
            matches = {},
            i = 0,
            j = 0;

        // find all events that match
        _level = 0;
        for (selector in _handlers[id][type]) {
            if (_handlers[id][type].hasOwnProperty(selector)) {
                match = _matchesSelector(target, selector, _gatorInstances[id].element);

                if (match && Gator.matchesEvent(type, _gatorInstances[id].element, match, selector == '_root', e)) {
                    _level++;
                    _handlers[id][type][selector].match = match;
                    matches[_level] = _handlers[id][type][selector];
                }
            }
        }

        // stopPropagation() fails to set cancelBubble to true in Webkit
        // @see http://code.google.com/p/chromium/issues/detail?id=162270
        e.stopPropagation = function() {
            e.cancelBubble = true;
        };

        for (i = 0; i <= _level; i++) {
            if (matches[i]) {
                for (j = 0; j < matches[i].length; j++) {
                    if (matches[i][j].call(matches[i].match, e) === false) {
                        Gator.cancel(e);
                        return;
                    }

                    if (e.cancelBubble) {
                        return;
                    }
                }
            }
        }
    }

    /**
     * binds the specified events to the element
     *
     * @param {string|Array} events
     * @param {string} selector
     * @param {Function} callback
     * @param {boolean=} remove
     * @returns {Object}
     */
    function _bind(events, selector, callback, remove) {

        // fail silently if you pass null or undefined as an alement
        // in the Gator constructor
        if (!this.element) {
            return;
        }

        if (!(events instanceof Array)) {
            events = [events];
        }

        if (!callback && typeof(selector) == 'function') {
            callback = selector;
            selector = '_root';
        }

        var id = this.id,
            i;

        function _getGlobalCallback(type) {
            return function(e) {
                _handleEvent(id, e, type);
            };
        }

        for (i = 0; i < events.length; i++) {
            if (remove) {
                _removeHandler(this, events[i], selector, callback);
                continue;
            }

            if (!_handlers[id] || !_handlers[id][events[i]]) {
                Gator.addEvent(this, events[i], _getGlobalCallback(events[i]));
            }

            _addHandler(this, events[i], selector, callback);
        }

        return this;
    }

    /**
     * Gator object constructor
     *
     * @param {Node} element
     */
    function Gator(element, id) {

        // called as function
        if (!(this instanceof Gator)) {
            // only keep one Gator instance per node to make sure that
            // we don't create a ton of new objects if you want to delegate
            // multiple events from the same node
            //
            // for example: Gator(document).on(...
            for (var key in _gatorInstances) {
                if (_gatorInstances[key].element === element) {
                    return _gatorInstances[key];
                }
            }

            _id++;
            _gatorInstances[_id] = new Gator(element, _id);

            return _gatorInstances[_id];
        }

        this.element = element;
        this.id = id;
    }

    /**
     * adds an event
     *
     * @param {string|Array} events
     * @param {string} selector
     * @param {Function} callback
     * @returns {Object}
     */
    Gator.prototype.on = function(events, selector, callback) {
        return _bind.call(this, events, selector, callback);
    };

    /**
     * removes an event
     *
     * @param {string|Array} events
     * @param {string} selector
     * @param {Function} callback
     * @returns {Object}
     */
    Gator.prototype.off = function(events, selector, callback) {
        return _bind.call(this, events, selector, callback, true);
    };

    Gator.matchesSelector = function() {};
    Gator.cancel = _cancel;
    Gator.addEvent = _addEvent;
    Gator.matchesEvent = function() {
        return true;
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Gator;
    }

    window.Gator = Gator;
}) ();

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gator = require('gator');

var _gator2 = _interopRequireDefault(_gator);

var _sweetScroll = require('sweet-scroll');

var _sweetScroll2 = _interopRequireDefault(_sweetScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var modeLi = {
  '.': 'findClass', // 特定のクラスの位置にジャンプ
  '?': 'query', // ハッシュ値をセレクタとしてジャンプ
  ';': 'exec', // ハッシュを評価
  '=': 'jump', // ハッシュを評価した結果の文字列をセレクタとしてジャンプ
  '+': 'func' };

var isAllowDomain;
var nameSpace = window;

var sweetScroll = void 0;

// TODO: SweetScrollカスタマイズ
function jumpTo(opts) {
  var target = opts.target;
  var animation = opts.animation;

  if (animation) {
    sweetScroll.toElement(target);
  } else {
    sweetScroll.toElement(target, {
      duration: 0
    });
  }
}

var HashabyCore = function () {
  function HashabyCore() {
    var _this = this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, HashabyCore);

    sweetScroll = new _sweetScroll2.default(opts.sweetScroll, opts.sweetScrollContainer);

    // new直後にloadイベントの代わりに実行
    this.immediate = opts.immediate;

    this.allowDomainArr = ['localhost'];
    this.forceHashchange = true;

    // 同じハッシュで何度も発火できるように
    // TODO: フラグではなくon/off制御
    (0, _gator2.default)(document).on('click', 'a[href]', function (evt) {
      if (_this.forceHashchange) {
        var elm = evt.target;
        var href = elm.getAttribute('href');

        // TODO: href='#'のときに戻れない→ここもpushState?
        if (typeof href === 'string' && href.match(/^#/)) {
          _this.clearHash();
          location.replace(href);
        }
      }
    });

    var hashchangeHandler = function hashchangeHandler(evt) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var hash = location.hash;
      var operator = hash[1];
      var mode = modeLi[operator];

      var animation = opts.animation;

      if (mode !== undefined) {
        var cmdStr = hash.replace(/^#./, '');

        _this.allowDomainArr.forEach(function (domain) {
          if (false) {} else if (typeof domain === 'string') {
            isAllowDomain = isAllowDomain || domain === location.hostname;
          } else if (domain instanceof RegExp) {
            isAllowDomain = isAllowDomain || domain.test(location.hostname);
          }
        });

        _this[mode](cmdStr, animation);
      }
    };

    if (this.immediate) {
      hashchangeHandler(null, {
        animation: false
      });
    } else {
      window.addEventListener('load', function (evt) {
        hashchangeHandler(evt, {
          animation: false
        });
      });
    }

    window.addEventListener('hashchange', function (evt) {
      hashchangeHandler(evt, {
        animation: true
      });
    });
  }

  _createClass(HashabyCore, [{
    key: 'findClass',
    value: function findClass(cmdStr, animation) {
      // var $elm = $('[class="' + cmdStr + '"]');
      var elm = document.querySelector('.' + cmdStr);
      jumpTo({
        target: elm,
        animation: animation
      });
    }
  }, {
    key: 'query',
    value: function query(cmdStr, animation) {
      var elm = document.querySelector(cmdStr);
      jumpTo({
        target: elm,
        animation: animation
      });
    }
  }, {
    key: 'exec',
    value: function exec(cmdStr) {
      if (isAllowDomain) {
        eval(cmdStr);
      }
    }
  }, {
    key: 'jump',
    value: function jump(cmdStr, animation) {
      var elm;
      if (isAllowDomain) {
        elm = document.querySelector(eval(cmdStr));
        jumpTo({
          target: elm,
          animation: animation
        });
      }
    }

    // TODO: コマンドに')'を含む文字列を渡せないのを解消

  }, {
    key: 'func',
    value: function func(cmdStr) {
      var matched = cmdStr.match(/^(.+)\((.*)\)$/) || cmdStr.match(/^(.+)$/) || [];
      var methodName = matched[1];
      var args = matched[2] || '';
      var argArr = args.split(',');

      var safeFlag = true;

      argArr.forEach(function (arg, i) {
        var strArg = (arg.match(/"(.*)"/) || arg.match(/'(.*)'/) || [])[1];
        var numArg = Number(arg);
        if (false) {} else if (strArg) {
          argArr[i] = String(strArg);
        } else if (!isNaN(numArg)) {
          argArr[i] = numArg;
        } else {
          safeFlag = false;
        }
      });

      var f = nameSpace[methodName];
      if (typeof f === 'function' && safeFlag) {
        f.apply(null, argArr);
      }
    }

    // 正規表現できたらワイルドカードは不要？

  }, {
    key: 'allowDomain',
    value: function allowDomain(hostname) {
      this.allowDomainArr.push(hostname);
    }

    // func用のnameSpaceの設定関数

  }, {
    key: 'doWith',
    value: function doWith(obj) {
      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
        nameSpace = obj;
      }
    }

    // 今のところHTMLをファイルとして開いた時に動作しない

  }, {
    key: 'clearHash',
    value: function clearHash() {
      var href = location.href;
      if (/^http/.test(href)) {
        var noHashHref = href.replace(/#.*$/, '');
        history.pushState(null, null, noHashHref);
      }
    }
  }]);

  return HashabyCore;
}();

exports.default = HashabyCore;
},{"gator":1,"sweet-scroll":3}],3:[function(require,module,exports){
/*!
 * sweet-scroll
 * Modern and the sweet smooth scroll library.
 * @author tsuyoshiwada
 * @license MIT
 * @version 2.2.0
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.SweetScroll = factory());
}(this, (function () { 'use strict';

var cos = Math.cos;
var sin = Math.sin;
var pow = Math.pow;
var abs = Math.abs;
var sqrt = Math.sqrt;
var asin = Math.asin;
var PI = Math.PI;
var max = Math.max;
var min = Math.min;
var round = Math.round;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var MAX_ARRAY_INDEX = pow(2, 53) - 1;
var classTypeList = ["Boolean", "Number", "String", "Function", "Array", "Object"];
var classTypes = {};

classTypeList.forEach(function (name) {
  classTypes["[object " + name + "]"] = name.toLowerCase();
});

function getType(obj) {
  if (obj == null) {
    return "";
  }

  return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? classTypes[Object.prototype.toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
}

function isNumber(obj) {
  return getType(obj) === "number";
}

function isString(obj) {
  return getType(obj) === "string";
}



function isFunction(obj) {
  return getType(obj) === "function";
}

function isArray(obj) {
  return Array.isArray(obj);
}

function isArrayLike(obj) {
  var length = obj == null ? null : obj.length;

  return isNumber(length) && length >= 0 && length <= MAX_ARRAY_INDEX;
}

function isNumeric(obj) {
  return !isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
}

function isObject(obj) {
  return !isArray(obj) && getType(obj) === "object";
}

function hasProp(obj, key) {
  return obj && obj.hasOwnProperty(key);
}



function each(obj, iterate, context) {
  if (obj == null) return obj;

  var ctx = context || obj;

  if (isObject(obj)) {
    for (var key in obj) {
      if (!hasProp(obj, key)) continue;
      if (iterate.call(ctx, obj[key], key) === false) break;
    }
  } else if (isArrayLike(obj)) {
    for (var i = 0; i < obj.length; i++) {
      if (iterate.call(ctx, obj[i], i) === false) break;
    }
  }

  return obj;
}

function merge(obj) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  each(sources, function (source) {
    each(source, function (value, key) {
      obj[key] = value;
    });
  });

  return obj;
}

function removeSpaces(str) {
  return str.replace(/\s*/g, "") || "";
}

function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  /* eslint-enable no-console */

  /* eslint-disable no-empty */
  try {
    throw new Error(message);
  } catch (e) {}
  /* eslint-enable no-empty */
}

// @link https://github.com/JedWatson/exenv/blob/master/index.js
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

// @link https://github.com/Modernizr/Modernizr
var history = function () {
  if (!canUseDOM) return false;

  var ua = navigator.userAgent;
  if ((ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) && ua.indexOf("Mobile Safari") !== -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Windows Phone") === -1) {
    return false;
  }

  return window.history && "pushState" in window.history && window.location.protocol !== "file:";
}();

var win = canUseDOM ? window : null;
var doc = canUseDOM ? document : null;

function $(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!selector) return;

  return (context == null ? doc : context).querySelector(selector);
}

function $$(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!selector) return;

  return (context == null ? doc : context).querySelectorAll(selector);
}

function matches(el, selector) {
  var results = (el.document || el.ownerDocument).querySelectorAll(selector);
  var i = results.length;
  while (--i >= 0 && results.item(i) !== el) {}

  return i > -1;
}

var directionMethodMap = {
  y: "scrollTop",
  x: "scrollLeft"
};

var directionPropMap = {
  y: "pageYOffset",
  x: "pageXOffset"
};

function isRootContainer(el) {
  return el === doc.documentElement || el === doc.body;
}

function getZoomLevel() {
  var outerWidth = win.outerWidth,
      innerWidth = win.innerWidth;


  return outerWidth ? outerWidth / innerWidth : 1;
}

function getScrollable(selectors) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "y";
  var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var method = directionMethodMap[direction];
  var elements = selectors instanceof Element ? [selectors] : $$(selectors);
  var scrollables = [];
  var $div = doc.createElement("div");

  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];

    if (el[method] > 0) {
      scrollables.push(el);
    } else {
      $div.style.width = el.clientWidth + 1 + "px";
      $div.style.height = el.clientHeight + 1 + "px";
      el.appendChild($div);

      el[method] = 1.5 / getZoomLevel();
      if (el[method] > 0) {
        scrollables.push(el);
      }
      el[method] = 0;

      el.removeChild($div);
    }

    if (!all && scrollables.length > 0) break;
  }

  return scrollables;
}

function scrollableFind(selectors, direction) {
  var scrollables = getScrollable(selectors, direction, false);

  return scrollables.length >= 1 ? scrollables[0] : null;
}

function getWindow(el) {
  return el != null && el === el.window ? el : el.nodeType === 9 && el.defaultView;
}

function getHeight(el) {
  return max(el.scrollHeight, el.clientHeight, el.offsetHeight);
}

function getWidth(el) {
  return max(el.scrollWidth, el.clientWidth, el.offsetWidth);
}

function getSize(el) {
  return {
    width: getWidth(el),
    height: getHeight(el)
  };
}

function getDocumentSize() {
  return {
    width: max(getWidth(doc.body), getWidth(doc.documentElement)),
    height: max(getHeight(doc.body), getHeight(doc.documentElement))
  };
}

function getViewportAndElementSizes(el) {
  if (isRootContainer(el)) {
    return {
      viewport: {
        width: min(win.innerWidth, doc.documentElement.clientWidth),
        height: win.innerHeight
      },
      size: getDocumentSize()
    };
  }

  return {
    viewport: {
      width: el.clientWidth,
      height: el.clientHeight
    },
    size: getSize(el)
  };
}

function getScroll(el) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "y";

  var currentWindow = getWindow(el);

  return currentWindow ? currentWindow[directionPropMap[direction]] : el[directionMethodMap[direction]];
}

function setScroll(el, offset) {
  var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "y";

  var currentWindow = getWindow(el);
  var top = direction === "y";
  if (currentWindow) {
    currentWindow.scrollTo(!top ? offset : currentWindow[directionPropMap.x], top ? offset : currentWindow[directionPropMap.y]);
  } else {
    el[directionMethodMap[direction]] = offset;
  }
}

function getOffset(el) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!el || el && !el.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  var rect = el.getBoundingClientRect();

  if (rect.width || rect.height) {
    var scroll = {};
    var ctx = null;
    if (context == null || isRootContainer(context)) {
      ctx = el.ownerDocument.documentElement;
      scroll.top = win.pageYOffset;
      scroll.left = win.pageXOffset;
    } else {
      ctx = context;
      var ctxRect = ctx.getBoundingClientRect();
      scroll.top = ctxRect.top * -1 + ctx.scrollTop;
      scroll.left = ctxRect.left * -1 + ctx.scrollLeft;
    }

    return {
      top: rect.top + scroll.top - ctx.clientTop,
      left: rect.left + scroll.left - ctx.clientLeft
    };
  }

  return rect;
}

function addEvent(el, event, listener) {
  var events = event.split(",");
  events.forEach(function (eventName) {
    el.addEventListener(eventName.trim(), listener, false);
  });
}

function removeEvent(el, event, listener) {
  var events = event.split(",");
  events.forEach(function (eventName) {
    el.removeEventListener(eventName.trim(), listener, false);
  });
}

/* eslint-disable no-param-reassign, newline-before-return, max-params, new-cap */
function linear(p) {
  return p;
}

function InQuad(x, t, b, c, d) {
  return c * (t /= d) * t + b;
}

function OutQuad(x, t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

function InOutQuad(x, t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t + b;
  }
  return -c / 2 * (--t * (t - 2) - 1) + b;
}

function InCubic(x, t, b, c, d) {
  return c * (t /= d) * t * t + b;
}

function OutCubic(x, t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function InOutCubic(x, t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t + b;
  }
  return c / 2 * ((t -= 2) * t * t + 2) + b;
}

function InQuart(x, t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
}

function OutQuart(x, t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function InOutQuart(x, t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t * t + b;
  }
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

function InQuint(x, t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
}

function OutQuint(x, t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

function InOutQuint(x, t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t * t * t + b;
  }
  return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

function InSine(x, t, b, c, d) {
  return -c * cos(t / d * (PI / 2)) + c + b;
}

function OutSine(x, t, b, c, d) {
  return c * sin(t / d * (PI / 2)) + b;
}

function InOutSine(x, t, b, c, d) {
  return -c / 2 * (cos(PI * t / d) - 1) + b;
}

function InExpo(x, t, b, c, d) {
  return t === 0 ? b : c * pow(2, 10 * (t / d - 1)) + b;
}

function OutExpo(x, t, b, c, d) {
  return t === d ? b + c : c * (-pow(2, -10 * t / d) + 1) + b;
}

function InOutExpo(x, t, b, c, d) {
  if (t === 0) return b;
  if (t === d) return b + c;
  if ((t /= d / 2) < 1) return c / 2 * pow(2, 10 * (t - 1)) + b;
  return c / 2 * (-pow(2, -10 * --t) + 2) + b;
}

function InCirc(x, t, b, c, d) {
  return -c * (sqrt(1 - (t /= d) * t) - 1) + b;
}

function OutCirc(x, t, b, c, d) {
  return c * sqrt(1 - (t = t / d - 1) * t) + b;
}

function InOutCirc(x, t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return -c / 2 * (sqrt(1 - t * t) - 1) + b;
  }
  return c / 2 * (sqrt(1 - (t -= 2) * t) + 1) + b;
}

function InElastic(x, t, b, c, d) {
  var s = 1.70158;
  var p = 0;
  var a = c;
  if (t === 0) return b;
  if ((t /= d) === 1) return b + c;
  if (!p) p = d * .3;
  if (a < abs(c)) {
    a = c;
    s = p / 4;
  } else {
    s = p / (2 * PI) * asin(c / a);
  }
  return -(a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * PI) / p)) + b;
}

function OutElastic(x, t, b, c, d) {
  var s = 1.70158;
  var p = 0;
  var a = c;
  if (t === 0) return b;
  if ((t /= d) === 1) return b + c;
  if (!p) p = d * .3;
  if (a < abs(c)) {
    a = c;
    s = p / 4;
  } else {
    s = p / (2 * PI) * asin(c / a);
  }
  return a * pow(2, -10 * t) * sin((t * d - s) * (2 * PI) / p) + c + b;
}

function InOutElastic(x, t, b, c, d) {
  var s = 1.70158;
  var p = 0;
  var a = c;
  if (t === 0) return b;
  if ((t /= d / 2) === 2) return b + c;
  if (!p) p = d * (.3 * 1.5);
  if (a < abs(c)) {
    a = c;
    s = p / 4;
  } else {
    s = p / (2 * PI) * asin(c / a);
  }
  if (t < 1) {
    return -.5 * (a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * PI) / p)) + b;
  }
  return a * pow(2, -10 * (t -= 1)) * sin((t * d - s) * (2 * PI) / p) * .5 + c + b;
}

function InBack(x, t, b, c, d) {
  var s = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1.70158;

  return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

function OutBack(x, t, b, c, d) {
  var s = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1.70158;

  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

function InOutBack(x, t, b, c, d) {
  var s = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1.70158;

  if ((t /= d / 2) < 1) {
    return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
  }
  return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
}

function OutBounce(x, t, b, c, d) {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
  }
}

function InBounce(x, t, b, c, d) {
  return c - OutBounce(x, d - t, 0, c, d) + b;
}

function InOutBounce(x, t, b, c, d) {
  if (t < d / 2) {
    return InBounce(x, t * 2, 0, c, d) * .5 + b;
  }
  return OutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
}

var Easing = Object.freeze({
	linear: linear,
	InQuad: InQuad,
	OutQuad: OutQuad,
	InOutQuad: InOutQuad,
	InCubic: InCubic,
	OutCubic: OutCubic,
	InOutCubic: InOutCubic,
	InQuart: InQuart,
	OutQuart: OutQuart,
	InOutQuart: InOutQuart,
	InQuint: InQuint,
	OutQuint: OutQuint,
	InOutQuint: InOutQuint,
	InSine: InSine,
	OutSine: OutSine,
	InOutSine: InOutSine,
	InExpo: InExpo,
	OutExpo: OutExpo,
	InOutExpo: InOutExpo,
	InCirc: InCirc,
	OutCirc: OutCirc,
	InOutCirc: InOutCirc,
	InElastic: InElastic,
	OutElastic: OutElastic,
	InOutElastic: InOutElastic,
	InBack: InBack,
	OutBack: OutBack,
	InOutBack: InOutBack,
	OutBounce: OutBounce,
	InBounce: InBounce,
	InOutBounce: InOutBounce
});

var vendors = ["ms", "moz", "webkit"];
var lastTime = 0;

var raf = canUseDOM ? win.requestAnimationFrame : null;
var caf = canUseDOM ? win.cancelAnimationFrame : null;

if (canUseDOM) {
  for (var x = 0; x < vendors.length && !raf; ++x) {
    raf = win[vendors[x] + "RequestAnimationFrame"];
    caf = win[vendors[x] + "CancelAnimationFrame"] || win[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!raf) {
    raf = function raf(callback) {
      var currentTime = Date.now();
      var timeToCall = max(0, 16 - (currentTime - lastTime));
      var id = setTimeout(function () {
        callback(currentTime + timeToCall);
      }, timeToCall);

      lastTime = currentTime + timeToCall;

      return id;
    };
  }

  if (!caf) {
    caf = function caf(id) {
      clearTimeout(id);
    };
  }
}

var ScrollTween = function () {
  function ScrollTween(el) {
    classCallCheck(this, ScrollTween);

    this.el = el;
    this.props = {};
    this.options = {};
    this.progress = false;
    this.easing = null;
    this.startTime = null;
    this.rafId = null;
  }

  createClass(ScrollTween, [{
    key: "run",
    value: function run(x, y, options) {
      var _this = this;

      if (this.progress) return;
      this.props = { x: x, y: y };
      this.options = options;
      this.easing = isFunction(options.easing) ? options.easing : Easing[options.easing.replace("ease", "")];
      this.progress = true;

      setTimeout(function () {
        _this.startProps = _this.calcStartProps(x, y);
        _this.rafId = raf(function (time) {
          return _this._loop(time);
        });
      }, this.options.delay);
    }
  }, {
    key: "stop",
    value: function stop() {
      var gotoEnd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var complete = this.options.complete;

      this.startTime = null;
      this.progress = false;
      caf(this.rafId);

      if (gotoEnd) {
        setScroll(this.el, this.props.x, "x");
        setScroll(this.el, this.props.y, "y");
      }

      if (isFunction(complete)) {
        complete.call(this);
        this.options.complete = null;
      }
    }
  }, {
    key: "_loop",
    value: function _loop(time) {
      var _this2 = this;

      if (!this.startTime) {
        this.startTime = time;
      }

      if (!this.progress) {
        this.stop(false);

        return;
      }

      var el = this.el,
          props = this.props,
          options = this.options,
          startTime = this.startTime,
          startProps = this.startProps,
          easing = this.easing;
      var duration = options.duration,
          step = options.step;

      var toProps = {};
      var timeElapsed = time - startTime;
      var t = min(1, max(timeElapsed / duration, 0));

      each(props, function (value, key) {
        var initialValue = startProps[key];
        var delta = value - initialValue;
        if (delta === 0) return true;

        var val = easing(t, duration * t, 0, 1, duration);
        toProps[key] = round(initialValue + delta * val);
      });

      each(toProps, function (value, key) {
        setScroll(el, value, key);
      });

      if (timeElapsed <= duration) {
        step.call(this, t, toProps);
        this.rafId = raf(function (currentTime) {
          return _this2._loop(currentTime);
        });
      } else {
        this.stop(true);
      }
    }
  }, {
    key: "calcStartProps",
    value: function calcStartProps(x, y) {
      var startProps = {
        x: getScroll(this.el, "x"),
        y: getScroll(this.el, "y")
      };

      if (this.options.quickMode) {
        var _Dom$getViewportAndEl = getViewportAndElementSizes(this.el),
            _Dom$getViewportAndEl2 = _Dom$getViewportAndEl.viewport,
            width = _Dom$getViewportAndEl2.width,
            height = _Dom$getViewportAndEl2.height;

        if (abs(startProps.y - y) > height) {
          startProps.y = startProps.y > y ? y + height : y - height;
        }

        if (abs(startProps.x - x) > width) {
          startProps.x = startProps.x > x ? x + width : x - width;
        }
      }

      return startProps;
    }
  }]);
  return ScrollTween;
}();

var WHEEL_EVENT = function () {
  if (!canUseDOM) return "wheel";

  if ("onwheel" in doc) {
    return "wheel";
  } else if ("onmousewheel" in doc) {
    return "mousewheel";
  } else {
    return "DOMMouseScroll";
  }
}();

var CONTAINER_STOP_EVENTS = WHEEL_EVENT + ", touchstart, touchmove";

var SweetScroll = function () {
  /* eslint-enable max-len */

  /**
   * SweetScroll constructor
   * @constructor
   * @param {Object} options
   * @param {String | Element} container
   */
  function SweetScroll() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "body, html";
    classCallCheck(this, SweetScroll);

    this.isSSR = !canUseDOM;
    this.options = merge({}, SweetScroll.defaults, options);
    this.container = this.getContainer(container);

    if (this.container == null) {
      this.header = null;
      this.tween = null;

      if (!this.isSSR) {
        if (!/comp|inter|loaded/.test(doc.readyState)) {
          this.log("Should be initialize later than DOMContentLoaded.");
        } else {
          this.log("Not found scrollable container. => \"" + container + "\"");
        }
      }
    } else {
      this.header = $(this.options.header);
      this.tween = new ScrollTween(this.container);
      this._trigger = null;
      this._shouldCallCancelScroll = false;
      this.bindContainerClick();
    }
  }

  /**
   * Output log
   * @param {String} message
   * @return {void}
   */


  // Default options
  /* eslint-disable max-len */


  createClass(SweetScroll, [{
    key: "log",
    value: function log(message) {
      if (this.options.outputLog) {
        warning("[SweetScroll] " + message);
      }
    }

    /**
     * Get scroll offset
     * @param {*} distance
     * @param {Object} options
     * @return {Object}
     * @private
     */

  }, {
    key: "getScrollOffset",
    value: function getScrollOffset(distance, options) {
      var container = this.container,
          header = this.header;

      var offset = this.parseCoodinate(options.offset);
      var scroll = this.parseCoodinate(distance);

      // Using the coordinates in the case of CSS Selector
      if (!scroll && isString(distance)) {
        if (distance === "#") {
          scroll = {
            top: 0,
            left: 0
          };
        } else {
          var target = $(distance);
          var targetOffset = getOffset(target, container);
          if (!targetOffset) return;
          scroll = targetOffset;
        }
      }

      if (!scroll) {
        return null;
      }

      // Apply `offset` value
      if (offset) {
        scroll.top += offset.top;
        scroll.left += offset.left;
      }

      // If the header is present apply the height
      if (header) {
        scroll.top = max(0, scroll.top - getSize(header).height);
      }

      return scroll;
    }

    /**
     * Normalize scroll offset
     * @param {Ojbect} scroll
     * @param {Ojbect} options
     * @return {Object}
     * @private
     */

  }, {
    key: "normalizeScrollOffset",
    value: function normalizeScrollOffset(scroll, options) {
      var container = this.container;

      var finalScroll = merge({}, scroll);

      // Determine the final scroll coordinates

      var _Dom$getViewportAndEl = getViewportAndElementSizes(container),
          viewport = _Dom$getViewportAndEl.viewport,
          size = _Dom$getViewportAndEl.size;

      // Adjustment of the maximum value


      finalScroll.top = options.verticalScroll ? max(0, min(size.height - viewport.height, finalScroll.top)) : getScroll(container, "y");

      finalScroll.left = options.horizontalScroll ? max(0, min(size.width - viewport.width, finalScroll.left)) : getScroll(container, "x");

      return finalScroll;
    }

    /**
     * Scroll animation to the specified position
     * @param {*} distance
     * @param {Object} options
     * @return {void}
     */

  }, {
    key: "to",
    value: function to(distance) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.isSSR) return;

      var container = this.container;

      var params = merge({}, this.options, options);
      var trigger = this._trigger;
      var hash = isString(distance) && /^#/.test(distance) ? distance : null;

      // Temporary options
      this._options = params;

      // Remove the triggering elements which has been temporarily retained
      this._trigger = null;

      // Disable the call flag of `cancelScroll`
      this._shouldCallCancelScroll = false;

      // Stop current animation
      this.stop();

      // Does not move if the container is not found
      if (!container) {
        return this.log("Not found container element.");
      }

      // Get scroll offset
      var scroll = this.getScrollOffset(distance, params);

      if (!scroll) {
        return this.log("Invalid parameter of distance. => " + distance);
      }

      // Call `beforeScroll`
      // Stop scrolling when it returns false
      if (this.hook(params, "beforeScroll", scroll, trigger) === false) {
        this._options = null;
        return;
      }

      scroll = this.normalizeScrollOffset(scroll, params);

      // Run the animation!!
      this.tween.run(scroll.left, scroll.top, {
        duration: params.duration,
        delay: params.delay,
        easing: params.easing,
        quickMode: params.quickMode,
        complete: function complete() {
          // Update URL
          if (hash != null && hash !== win.location.hash) {
            _this.updateURLHash(hash, params.updateURL);
          }

          // Unbind the scroll stop events, And call `afterScroll` or `cancelScroll`
          _this.unbindContainerStop();

          // Remove the temporary options
          _this._options = null;

          // Call `cancelScroll` or `afterScroll`
          if (_this._shouldCallCancelScroll) {
            _this.hook(params, "cancelScroll");
          } else {
            _this.hook(params, "afterScroll", scroll, trigger);
          }

          // Call `completeScroll`
          _this.hook(params, "completeScroll", _this._shouldCallCancelScroll);
        },
        step: function step(currentTime, props) {
          _this.hook(params, "stepScroll", currentTime, props);
        }
      });

      // Bind the scroll stop events
      this.bindContainerStop();
    }

    /**
     * Scroll animation to the specified top position
     * @param {*} distance
     * @param {Object} options
     * @return {void}
     */

  }, {
    key: "toTop",
    value: function toTop(distance) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.to(distance, merge({}, options, {
        verticalScroll: true,
        horizontalScroll: false
      }));
    }

    /**
     * Scroll animation to the specified left position
     * @param {*} distance
     * @param {Object} options
     * @return {void}
     */

  }, {
    key: "toLeft",
    value: function toLeft(distance) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.to(distance, merge({}, options, {
        verticalScroll: false,
        horizontalScroll: true
      }));
    }

    /**
     * Scroll animation to the specified element
     * @param {Element} el
     * @param {Object} options
     * @return {void}
     */

  }, {
    key: "toElement",
    value: function toElement(el) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.isSSR) return;

      if (el instanceof Element) {
        var offset = getOffset(el, this.container);
        this.to(offset, merge({}, options));
      } else {
        this.log("Invalid parameter.");
      }
    }

    /**
     * Stop the current animation
     * @param {Boolean} gotoEnd
     * @return {void}
     */

  }, {
    key: "stop",
    value: function stop() {
      var gotoEnd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.isSSR) return;

      if (!this.container) {
        this.log("Not found scrollable container.");
      } else {
        if (this._stopScrollListener) {
          this._shouldCallCancelScroll = true;
        }

        this.tween.stop(gotoEnd);
      }
    }

    /**
     * Update the instance
     * @param {Object} options
     * @return {void}
     */

  }, {
    key: "update",
    value: function update() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.container) {
        if (!this.isSSR) {
          this.log("Not found scrollable container.");
        }
      } else {
        this.stop();
        this.unbindContainerClick();
        this.unbindContainerStop();
        this.options = merge({}, this.options, options);
        this.header = $(this.options.header);
        this.bindContainerClick();
      }
    }

    /**
     * Destroy SweetScroll instance
     * @return {void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.container) {
        if (!this.isSSR) {
          this.log("Not found scrollable container.");
        }
      } else {
        this.stop();
        this.unbindContainerClick();
        this.unbindContainerStop();
        this.container = null;
        this.header = null;
        this.tween = null;
      }
    }

    /* eslint-disable no-unused-vars */
    /**
     * Called at before of the scroll.
     * @param {Object} toScroll
     * @param {Element} trigger
     * @return {Boolean}
     */

  }, {
    key: "beforeScroll",
    value: function beforeScroll(toScroll, trigger) {
      return true;
    }

    /**
     * Called at cancel of the scroll.
     * @return {void}
     */

  }, {
    key: "cancelScroll",
    value: function cancelScroll() {}

    /**
     * Called at after of the scroll.
     * @param {Object} toScroll
     * @param {Element} trigger
     * @return {void}
     */

  }, {
    key: "afterScroll",
    value: function afterScroll(toScroll, trigger) {}

    /**
     * Called at complete of the scroll.
     * @param {Boolean} isCancel
     * @return {void}
     */

  }, {
    key: "completeScroll",
    value: function completeScroll(isCancel) {}

    /**
     * Called at each animation frame of the scroll.
     * @param {Float} currentTime
     * @param {Object} props
     * @return {void}
     */

  }, {
    key: "stepScroll",
    value: function stepScroll(currentTime, props) {}
    /* eslint-enable no-unused-vars */

    /**
     * Parse the value of coordinate
     * @param {*} coodinate
     * @return {Object}
     */

  }, {
    key: "parseCoodinate",
    value: function parseCoodinate(coodinate) {
      var enableTop = this._options ? this._options.verticalScroll : this.options.verticalScroll;
      var scroll = { top: 0, left: 0 };

      // Object
      if (hasProp(coodinate, "top") || hasProp(coodinate, "left")) {
        scroll = merge(scroll, coodinate);

        // Array
      } else if (isArray(coodinate)) {
        if (coodinate.length === 2) {
          scroll.top = coodinate[0];
          scroll.left = coodinate[1];
        } else {
          scroll.top = enableTop ? coodinate[0] : 0;
          scroll.left = !enableTop ? coodinate[0] : 0;
        }

        // Number
      } else if (isNumeric(coodinate)) {
        scroll.top = enableTop ? coodinate : 0;
        scroll.left = !enableTop ? coodinate : 0;

        // String
      } else if (isString(coodinate)) {
        var trimedCoodinate = removeSpaces(coodinate);

        // "{n},{n}" (Array like syntax)
        if (/^\d+,\d+$/.test(trimedCoodinate)) {
          trimedCoodinate = trimedCoodinate.split(",");
          scroll.top = trimedCoodinate[0];
          scroll.left = trimedCoodinate[1];

          // "top:{n}, left:{n}" (Object like syntax)
        } else if (/^(top|left):\d+,?(?:(top|left):\d+)?$/.test(trimedCoodinate)) {
          var top = trimedCoodinate.match(/top:(\d+)/);
          var left = trimedCoodinate.match(/left:(\d+)/);
          scroll.top = top ? top[1] : 0;
          scroll.left = left ? left[1] : 0;

          // "+={n}", "-={n}" (Relative position)
        } else if (this.container && /^(\+|-)=(\d+)$/.test(trimedCoodinate)) {
          var current = getScroll(this.container, enableTop ? "y" : "x");
          var results = trimedCoodinate.match(/^(\+|-)=(\d+)$/);
          var op = results[1];
          var value = parseInt(results[2], 10);
          if (op === "+") {
            scroll.top = enableTop ? current + value : 0;
            scroll.left = !enableTop ? current + value : 0;
          } else {
            scroll.top = enableTop ? current - value : 0;
            scroll.left = !enableTop ? current - value : 0;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }

      scroll.top = parseInt(scroll.top, 10);
      scroll.left = parseInt(scroll.left, 10);

      return scroll;
    }

    /**
     * Update the Hash of the URL.
     * @param {String} hash
     * @param {Boolean | String} historyType
     * @return {void}
     */

  }, {
    key: "updateURLHash",
    value: function updateURLHash(hash, historyType) {
      if (this.isSSR || !history || !historyType) return;
      win.history[historyType === "replace" ? "replaceState" : "pushState"](null, null, hash);
    }

    /**
     * Get the container for the scroll, depending on the options.
     * @param {String | Element} selector
     * @return {?Element}
     * @private
     */

  }, {
    key: "getContainer",
    value: function getContainer(selector) {
      var _options = this.options,
          verticalScroll = _options.verticalScroll,
          horizontalScroll = _options.horizontalScroll;

      var container = null;

      if (this.isSSR) return container;

      if (verticalScroll) {
        container = scrollableFind(selector, "y");
      }

      if (!container && horizontalScroll) {
        container = scrollableFind(selector, "x");
      }

      return container;
    }

    /**
     * Bind a click event to the container
     * @return {void}
     * @private
     */

  }, {
    key: "bindContainerClick",
    value: function bindContainerClick() {
      var container = this.container;

      if (!container) return;
      this._containerClickListener = this.handleContainerClick.bind(this);
      addEvent(container, "click", this._containerClickListener);
    }

    /**
     * Unbind a click event to the container
     * @return {void}
     * @private
     */

  }, {
    key: "unbindContainerClick",
    value: function unbindContainerClick() {
      var container = this.container;

      if (!container || !this._containerClickListener) return;
      removeEvent(container, "click", this._containerClickListener);
      this._containerClickListener = null;
    }

    /**
     * Bind the scroll stop of events
     * @return {void}
     * @private
     */

  }, {
    key: "bindContainerStop",
    value: function bindContainerStop() {
      var container = this.container;

      if (!container) return;
      this._stopScrollListener = this.handleStopScroll.bind(this);
      addEvent(container, CONTAINER_STOP_EVENTS, this._stopScrollListener);
    }

    /**
     * Unbind the scroll stop of events
     * @return {void}
     * @private
     */

  }, {
    key: "unbindContainerStop",
    value: function unbindContainerStop() {
      var container = this.container;

      if (!container || !this._stopScrollListener) return;
      removeEvent(container, CONTAINER_STOP_EVENTS, this._stopScrollListener);
      this._stopScrollListener = null;
    }

    /**
     * Call the specified callback
     * @param {Object} options
     * @param {String} type
     * @param {...*} args
     * @return {void}
     * @private
     */

  }, {
    key: "hook",
    value: function hook(options, type) {
      var callback = options[type];

      // callback

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      if (isFunction(callback)) {
        var result = callback.apply(this, args);
        if (typeof result === "undefined") return result;
      }

      // method
      return this[type].apply(this, args);
    }

    /**
     * Handling of scroll stop event
     * @param {Event} e
     * @return {void}
     * @private
     */

  }, {
    key: "handleStopScroll",
    value: function handleStopScroll(e) {
      var stopScroll = this._options ? this._options.stopScroll : this.options.stopScroll;
      if (stopScroll) {
        this.stop();
      } else {
        e.preventDefault();
      }
    }

    /**
     * Handling of container click event
     * @param {Event} e
     * @return {void}
     * @private
     */

  }, {
    key: "handleContainerClick",
    value: function handleContainerClick(e) {
      var options = this.options;

      var el = e.target;

      // Explore parent element until the trigger selector matches
      for (; el && el !== doc; el = el.parentNode) {
        if (!matches(el, options.trigger)) continue;
        var data = el.getAttribute("data-scroll");
        var dataOptions = this.parseDataOptions(el);
        var href = data || el.getAttribute("href");

        options = merge({}, options, dataOptions);

        if (options.preventDefault) e.preventDefault();
        if (options.stopPropagation) e.stopPropagation();

        // Passes the trigger elements to callback
        this._trigger = el;

        if (options.horizontalScroll && options.verticalScroll) {
          this.to(href, options);
        } else if (options.verticalScroll) {
          this.toTop(href, options);
        } else if (options.horizontalScroll) {
          this.toLeft(href, options);
        }
      }
    }

    /**
     * Parse the data-scroll-options attribute
     * @param {Element} el
     * @return {Object}
     * @private
     */

  }, {
    key: "parseDataOptions",
    value: function parseDataOptions(el) {
      var options = el.getAttribute("data-scroll-options");
      return options ? JSON.parse(options) : {};
    }
  }]);
  return SweetScroll;
}();

// Export SweetScroll class


SweetScroll.defaults = {
  trigger: "[data-scroll]", // Selector for trigger (must be a valid css selector)
  header: "[data-scroll-header]", // Selector for fixed header (must be a valid css selector)
  duration: 1000, // Specifies animation duration in integer
  delay: 0, // Specifies timer for delaying the execution of the scroll in milliseconds
  easing: "easeOutQuint", // Specifies the pattern of easing
  offset: 0, // Specifies the value to offset the scroll position in pixels
  verticalScroll: true, // Enable the vertical scroll
  horizontalScroll: false, // Enable the horizontal scroll
  stopScroll: true, // When fired wheel or touchstart events to stop scrolling
  updateURL: false, // Update the URL hash on after scroll (true | false | "push" | "replace")
  preventDefault: true, // Cancels the container element click event
  stopPropagation: true, // Prevents further propagation of the container element click event in the bubbling phase
  outputLog: false, // Specify level of output to log
  quickMode: false, // Instantly scroll to the destination! (It's recommended to use it with `easeOutExpo`)

  // Callbacks
  beforeScroll: null,
  afterScroll: null,
  cancelScroll: null,
  completeScroll: null,
  stepScroll: null
};

return SweetScroll;

})));

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// from [Web Audio APIを利用してオーディオビジュアライザを作成する ~その2 再生中の音から波形データを取得して描画する~ - Qiita](http://qiita.com/soarflat/items/4aa001dac115a4af6dbe)

// requestAnimationFrameを多くのブラウザで利用するためにprefixの記載
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

// AudioNodeを管理するAudioContextの生成
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function inv(n) {
  if (n === 0) {
    return 0;
  } else {
    return 1 / (n * Math.PI);
  }
}

/**
 * 音声ファイルローダー
 */

var Loader = function () {
  function Loader() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Loader);

    this.url = opts.url; // 読み込む音声データのURL
    this.elm = opts.elm;
    this.ctx = opts.ctx;
    this.amp = opts.amp;
    this.kernelLen = opts.kernelLen;
    this.width = opts.width;
    this.height = opts.height;
  }

  // XMLHttpRequestを利用して音声データ(バッファ)を読み込む。


  _createClass(Loader, [{
    key: 'loadBuffer',
    value: function loadBuffer() {
      var loader = void 0,
          request = void 0;
      loader = this;
      request = new XMLHttpRequest();
      request.open('GET', this.url, true);
      request.responseType = 'arraybuffer';

      var _this = this;

      request.onload = function () {
        // 取得したデータをデコードする。
        audioCtx.decodeAudioData(this.response, function (buffer) {
          if (!buffer) {
            console.log('error');
            return;
          }

          $(_this.elm).on('click', function (_evt) {
            $(_this.elm).addClass('is-play');

            loader.playSound(buffer); // デコードされたデータを再生する。
          });
        }, function (error) {
          console.log('decodeAudioData error');
        });
      };

      request.onerror = function () {
        console.log('Loader: XHR error');
      };

      request.send();
    }
  }, {
    key: 'playSound',


    // 読み込んだ音声データ(バッファ)を再生と波形データの描画を開始する。
    value: function playSound(buffer) {
      var visualizer = new Visualizer(buffer, {
        elm: this.elm,
        width: this.width,
        height: this.height,
        ctx: this.ctx,
        amp: this.amp,
        kernelLen: this.kernelLen
      });
    }
  }]);

  return Loader;
}();

;

/**
 * ビジュアライザー
 */

var Visualizer = function () {
  function Visualizer(buffer) {
    var _this2 = this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Visualizer);

    this.elm = opts.elm;

    this.playFlag = true;

    this.ctx = opts.ctx;

    this.amp = opts.amp;
    this.kernelLen = opts.kernelLen;

    this.width = opts.width || 256;
    this.height = opts.height || 256;

    this.sourceNode = audioCtx.createBufferSource(); // AudioBufferSourceNodeを作成
    this.sourceNode.buffer = buffer; // 取得した音声データ(バッファ)を音源に設定
    this.analyserNode = audioCtx.createAnalyser(); // AnalyserNodeを作成
    this.times = new Float32Array(this.analyserNode.frequencyBinCount); // 時間領域の波形データを格納する配列を生成 
    this.sourceNode.connect(this.analyserNode); // AudioBufferSourceNodeをAnalyserNodeに接続
    this.analyserNode.connect(audioCtx.destination); // AnalyserNodeをAudioDestinationNodeに接続
    this.sourceNode.start(0); // 再生開始
    this.draw(); // 描画開始

    this.sourceNode.onended = function () {
      $(_this2.elm).removeClass('is-play');

      _this2.playFlag = false;
    };
  }

  _createClass(Visualizer, [{
    key: 'draw',
    value: function draw() {
      var _this3 = this;

      // 0~1まで設定でき、0に近いほど描画の更新がスムーズになり, 1に近いほど描画の更新が鈍くなる。
      this.analyserNode.smoothingTimeConstant = 0.5;

      // FFTサイズを指定する。デフォルトは2048。
      this.analyserNode.fftSize = 2048;

      // 時間領域の波形データを引数の配列に格納するメソッド。
      // analyserNode.fftSize / 2の要素がthis.timesに格納される。今回の配列の要素数は1024。
      this.analyserNode.getFloatTimeDomainData(this.times);

      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.beginPath();

      var len = this.analyserNode.frequencyBinCount - this.kernelLen;
      for (var i = this.kernelLen; i < len; i++) {
        var hilbTmp = 0;
        for (var k = -this.kernelLen; k <= this.kernelLen; k++) {
          hilbTmp += inv(k) * (this.times[i + k] || 0);
        }
        var x = this.width / 2 + this.amp * this.times[i];
        var y = this.height / 2 - this.amp * hilbTmp;
        this.ctx.lineTo(x, y);
      }
      this.ctx.stroke();

      window.requestAnimationFrame(function () {
        if (_this3.playFlag) {
          _this3.draw();
        }
      });
    }
  }]);

  return Visualizer;
}();

;

var BtcAnalyticSignalViewer = function () {
  function BtcAnalyticSignalViewer() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BtcAnalyticSignalViewer);

    this.initialize(opts);
  }

  _createClass(BtcAnalyticSignalViewer, [{
    key: 'initialize',
    value: function initialize() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.elm = opts.elm || document.querySelector('.btc-analytic-signal-viewer');

      var url = $(this.elm).attr('data-src');

      this.$canvas = $('<canvas class="elm-canvas"></canvas>');

      $(this.elm).append(this.$canvas);

      this.canvasElm = this.$canvas.get(0);
      this.canvasElm.width = 256;
      this.canvasElm.height = 256;

      this.audioElm = this.elm.querySelector('.elm-audio');

      this.kernelLen = opts.kernelLen || 127;
      this.amp = opts.amp || 128;

      this.width = opts.width || 256;
      this.height = opts.height || 256;

      this.ctx = this.canvasElm.getContext("2d");

      this.canvasElm.width = this.width;
      this.canvasElm.height = this.height;

      this.analyser = audioCtx.createAnalyser();

      var loader = new Loader({
        elm: this.elm,
        ctx: this.ctx,
        width: this.width,
        height: this.height,
        url: url,
        amp: 256,
        kernelLen: this.kernelLen
      });
      loader.loadBuffer();
    }
  }]);

  return BtcAnalyticSignalViewer;
}();

exports.default = BtcAnalyticSignalViewer;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var max = 6900;
var min = 0;

var touchStart = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
var touchEnd = 'ontouchend' in window ? 'touchend' : 'mouseup';

var bn = void 0;

var BtcButchiNumberViewer = function BtcButchiNumberViewer() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, BtcButchiNumberViewer);

  $(function () {
    var _this = this;

    this.elm = opts.elm;
    var $elm = $(this.elm);

    this.touching = false;

    this.initialNumber = opts.initialNumber;

    this.elm.innerHTML = '\n<p><input class="input-number" type="number" value="1000"></p>\n<canvas class="display-butchi-number"></canvas>\n\n<div class="area-tap">\n  <p class="btn" data-operation="up"></p>\n  <p class="btn" data-operation="down"></p>\n</div>\n      ';

    this.$upBtn = $elm.find('.btn[data-operation="up"]');
    this.$downBtn = $elm.find('.btn[data-operation="down"]');

    this.$inputNumber = $('.input-number');
    this.$inputNumber.attr('max', max);
    this.$inputNumber.attr('min', min);

    this.$inputNumber.on('input', function (e) {
      var val = parseInt($(this).val(), 10);
      if (isFinite(val) && val >= min && val < max) {
        bn.setNumber(val);
        bn.draw();
      }
    });

    bn = new ButchiNumber({
      elm: this.elm,
      initialNumber: this.initialNumber
    });

    bn.draw();

    this.$upBtn.on(touchStart, function (evt) {
      evt.preventDefault();

      var cnt = 0;

      var loop = function loop() {
        if (bn.number < max) {
          bn.incr();
          bn.draw();
          _this.$inputNumber.val(bn.number);
        }

        if (_this.touching) {
          setTimeout(function () {
            cnt++;
            loop();
          }, cnt === 0 ? 500 : 10);
        }
      };

      _this.touching = true;

      loop();
    });

    this.$downBtn.on(touchStart, function (evt) {
      evt.preventDefault();

      var cnt = 0;

      var loop = function loop() {
        if (bn.number > min) {
          bn.decr();
          bn.draw();
          _this.$inputNumber.val(bn.number);
        }

        if (_this.touching) {
          setTimeout(function () {
            cnt++;
            loop();
          }, cnt === 0 ? 500 : 10);
        }
      };

      _this.touching = true;

      loop();
    });

    $('body').on(touchEnd, function () {
      _this.touching = false;
    });

    $elm.find('.area-tap .btn').on('mouseout', function () {
      _this.touching = false;
    });
  });
};

exports.default = BtcButchiNumberViewer;

var BNCanvas = function BNCanvas() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, BNCanvas);

  this.width = opts.width;
  this.height = opts.height;

  this.elm = document.createElement('canvas');
  this.elm.width = this.width;
  this.elm.height = this.height;

  this.width = this.elm.width;
  this.height = this.elm.height;
  this.ctx = this.elm.getContext('2d');

  var dispCanvas = document.querySelector('.display-butchi-number');
  dispCanvas.width = this.width;
  dispCanvas.height = this.height;

  this.dispCtx = dispCanvas.getContext('2d');
  this.dispCtx.transform(-1, 0, 0, -1, 0, 0);
  this.dispCtx.translate(-this.width, -this.height);
  this.bmp = this.ctx.createImageData(this.width, this.height);
};

var ButchiNumber = function () {
  function ButchiNumber() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ButchiNumber);

    this.elm = opts.elm;

    this.number = 0;

    this.canvas = new BNCanvas({
      width: 256,
      height: 256
    });
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.setNumber(opts.initialNumber);
  }

  _createClass(ButchiNumber, [{
    key: 'setNumber',
    value: function setNumber(n) {
      if (n > this.number) {
        while (this.number < n) {
          this.incr();
        }
      } else if (n < this.number) {
        while (this.number > n) {
          this.decr();
        }
      }
    }

    // インクリメント則に従って1を加算。オーバーフロー時は2を返して正常に加算されない

  }, {
    key: 'incr',
    value: function incr() {
      var i1, i2, j1, j2;
      this.number++;

      if (this.getDigit(0, 0) == 0) {
        this.setDigit(0, 0, 1);
        return 0;
      }
      this.setDigit(0, 0, 0);

      i1 = 1, j1 = 0, i2 = 0, j2 = 1;
      while (i1 != i2 || j1 != j2) {
        while (j1 < j2) {
          if (this.getDigit(i1, j1) == 1) {
            if (i1 < this.width) {
              this.setDigit(i1, j1, 0);
              i1++;
            } else {
              return 2;
            }
          } else {
            if (j1 < this.height) {
              this.setDigit(i1, j1, 1);
              j1++;
            } else {
              return 2;
            }
          }
        }
        while (i2 < i1) {
          if (this.getDigit(i2, j2) == 1) {
            if (j2 < this.height) {
              this.setDigit(i2, j2, 0);
              j2++;
            } else {
              return 2;
            }
          } else {
            if (i2 < this.width) {
              this.setDigit(i2, j2, 1);
              i2++;
            } else {
              return 2;
            }
          }
        }
      }
      return 0;
    }
  }, {
    key: 'decr',


    // デクリメント則に従って1を減算。負の数には対応していない
    value: function decr() {
      var i1, i2, j1, j2;
      this.number--;

      if (this.getDigit(0, 0) == 1) {
        this.setDigit(0, 0, 0);
        return 0;
      }
      this.setDigit(0, 0, 1);

      i1 = 1, j1 = 0, i2 = 0, j2 = 1;
      while (i1 != i2 || j1 != j2) {
        while (j1 < j2) {
          if (this.getDigit(i1, j1) == 0) {
            if (i1 < this.width) {
              this.setDigit(i1, j1, 1);
              i1++;
            } else {
              return 2;
            }
          } else {
            if (j1 < this.height) {
              this.setDigit(i1, j1, 0);
              j1++;
            } else {
              return 2;
            }
          }
        }
        while (i2 < i1) {
          if (this.getDigit(i2, j2) == 0) {
            if (j2 < this.height) {
              this.setDigit(i2, j2, 1);
              j2++;
            } else {
              return 2;
            }
          } else {
            if (i2 < this.width) {
              this.setDigit(i2, j2, 0);
              i2++;
            } else {
              return 2;
            }
          }
        }
      }
      return 0;
    }
  }, {
    key: 'setDigit',
    value: function setDigit(x, y, flag) {
      this.canvas.bmp.data[4 * (y * this.width + x) + 3] = flag == 1 ? 255 : 0;
    }
  }, {
    key: 'getDigit',
    value: function getDigit(x, y) {
      return this.canvas.bmp.data[4 * (y * this.width + x) + 3] == 255 ? 1 : 0;
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.canvas.ctx.putImageData(this.canvas.bmp, 0, 0);
      this.canvas.dispCtx.clearRect(0, 0, this.width, this.height);
      this.canvas.dispCtx.drawImage(this.canvas.ctx.canvas, 0, 0);
    }
  }]);

  return ButchiNumber;
}();

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BtcSpreadSheet = require('../module/BtcSpreadSheet');

var _BtcSpreadSheet2 = _interopRequireDefault(_BtcSpreadSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BtcNews = function () {
  function BtcNews() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BtcNews);

    this.initialize(opts);
  }

  _createClass(BtcNews, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.$elm = opts.$elm || $('.btc-news');

      this.btcSpreadSheet = new _BtcSpreadSheet2.default({
        sheetId: '18Vf0-hu_ho6vdRSSrsQAy793OqdVpn6OCE9XCMsmtns',
        callback: function callback(data) {
          var $list = $('<ul></ul>');
          $list.addClass('list');

          data.reverse().forEach(function (item) {
            var date = item.date;
            var body = item.body;
            var tag = item.tag;

            var $item = $('<li></li>');
            $item.addClass('item');

            $item.html('\n            [' + tag + '] ' + body + ' ( ' + date + ' )\n          ');

            $list.append($item);
          });

          _this.$elm.append($list);
        }
      });
    }
  }]);

  return BtcNews;
}();

exports.default = BtcNews;

},{"../module/BtcSpreadSheet":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BtcSpreadSheet = function () {
  function BtcSpreadSheet() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BtcSpreadSheet);

    this.initialize(opts);
  }

  _createClass(BtcSpreadSheet, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.sheetId = opts.sheetId;
      this.callback = opts.callback || _.noop;
      this.failed = opts.failed || _.noop;

      $.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/' + this.sheetId + '/od6/public/basic?alt=json-in-script',
        type: 'GET',
        dataType: 'jsonp'
      }).then(function (data) {
        var entryArr = data.feed.entry;

        var ret = [];

        entryArr.forEach(function (entry) {
          var rowArr = entry.content.$t.split(', ');
          var obj = {};

          rowArr.forEach(function (row) {
            var keyVal = row.split(': ');
            obj[keyVal[0]] = keyVal.slice(1);
          });

          ret.push(obj);
        });

        _this.callback(ret);
      }).fail(function (err) {
        _this.failed(err);
      });
    }
  }]);

  return BtcSpreadSheet;
}();

exports.default = BtcSpreadSheet;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BtcSwfObject = function () {
  function BtcSwfObject() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BtcSwfObject);

    this.initialize(opts);
  }

  _createClass(BtcSwfObject, [{
    key: 'initialize',
    value: function initialize() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.elm = opts.elm;

      this.width = opts.width || this.elm.getAttribute('data-width') || 610;
      this.height = opts.height || this.elm.getAttribute('data-height') || 377;

      this.version = opts.version || this.elm.getAttribute('data-version') || 10;

      this.src = opts.src || this.elm.getAttribute('data-src');

      swfobject.embedSWF(this.src, this.elm, this.width, this.height, 10);
    }
  }]);

  return BtcSwfObject;
}();

$('.btc-swf-object').each(function (i, elm) {
  new BtcSwfObject({
    elm: elm
  });
});

exports.default = BtcSwfObject;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
  function Main() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Main);

    console.log('Hello, world!');

    this.initialize();

    console.log('Thanks, world!');
  }

  _createClass(Main, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      $(function () {
        _this.router = new _Router2.default();
      });
    }
  }]);

  return Main;
}();

exports.default = Main;

},{"./Router":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ns = require('./ns');

var _ns2 = _interopRequireDefault(_ns);

var _common = require('../page/common');

var _common2 = _interopRequireDefault(_common);

var _root = require('../page/root');

var _root2 = _interopRequireDefault(_root);

var _analyticSignal = require('../page/documents/analytic-signal');

var _analyticSignal2 = _interopRequireDefault(_analyticSignal);

var _butchiNumber = require('../page/documents/butchi-number');

var _butchiNumber2 = _interopRequireDefault(_butchiNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function page(path, callback) {
  if (document.querySelector('body[data-path="' + path + '"]')) {
    callback();
  }
};

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);

    this.initialize();
  }

  _createClass(Router, [{
    key: 'initialize',
    value: function initialize() {
      _ns2.default.page = _ns2.default.page || {};

      (0, _common2.default)();

      page('/', _root2.default);
      page('documents/analytic-signal/', _analyticSignal2.default);
      page('documents/butchi-number/', _butchiNumber2.default);
    }
  }]);

  return Router;
}();

exports.default = Router;

},{"../page/common":12,"../page/documents/analytic-signal":13,"../page/documents/butchi-number":14,"../page/root":15,"./ns":11}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * グローバル直下に変数を置かないよう、ネームスペースを切る。
 * ネームスペース以下の変数にアクセスしたいときは各クラスでこれをimportする
 */

window.Btc = window.Btc || {};
var ns = window.Btc;
exports.default = ns;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ns = require('../module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _hashaby = require('hashaby');

var _hashaby2 = _interopRequireDefault(_hashaby);

var _BtcSwfObject = require('../module/BtcSwfObject');

var _BtcSwfObject2 = _interopRequireDefault(_BtcSwfObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  console.log('page common');

  setEnvClass();

  document.addEventListener('mdl-componentupgraded', function (_evt) {
    _ns2.default.hashaby = new _hashaby2.default({
      sweetScrollContainer: '.mdl-layout__content',
      immediate: true
    });
  });
};

function setEnvClass() {
  var $html = $('html');

  _ns2.default.isSp = false;
  _ns2.default.isPc = false;
  _ns2.default.isTab = false;

  if ($html.hasClass('is-sp')) {
    _ns2.default.isSp = true;
  }
  if ($html.hasClass('is-pc')) {
    _ns2.default.isPc = true;
  }
  if ($html.hasClass('is-tab')) {
    _ns2.default.isTab = true;
  }
}

},{"../module/BtcSwfObject":8,"../module/ns":11,"hashaby":2}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ns = require('../../module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _BtcAnalyticSignalViewer = require('../../module/BtcAnalyticSignalViewer');

var _BtcAnalyticSignalViewer2 = _interopRequireDefault(_BtcAnalyticSignalViewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  console.log('page analytic-signal');

  $('.item-as').each(function (i, elm) {
    _ns2.default.page.btcAnalyticSignalViewer = new _BtcAnalyticSignalViewer2.default({
      elm: elm.querySelector('.btc-analytic-signal-viewer')
    });
  });
};

},{"../../module/BtcAnalyticSignalViewer":4,"../../module/ns":11}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ns = require('../../module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _BtcButchiNumberViewer = require('../../module/BtcButchiNumberViewer');

var _BtcButchiNumberViewer2 = _interopRequireDefault(_BtcButchiNumberViewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  console.log('page butchi-number');

  new _BtcButchiNumberViewer2.default({
    elm: document.querySelector('.btc-butchi-number-viewer'),
    width: 256,
    height: 256,
    initialNumber: 1000
  });
};

},{"../../module/BtcButchiNumberViewer":5,"../../module/ns":11}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ns = require('../module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _BtcNews = require('../module/BtcNews');

var _BtcNews2 = _interopRequireDefault(_BtcNews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  console.log('index page');

  _ns2.default.page.btcNews = new _BtcNews2.default();
};

},{"../module/BtcNews":6,"../module/ns":11}],16:[function(require,module,exports){
'use strict';

var _ns = require('./module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Main = require('./module/Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// エントリーポイント。indexからはライブラリとこれしか呼ばない

_ns2.default.main = new _Main2.default();

},{"./module/Main":9,"./module/ns":11}]},{},[16]);
