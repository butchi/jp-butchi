(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

          data.forEach(function (item) {
            var date = item.date;
            var body = item.body;
            var tag = item.tag;

            var $item = $('<li></li>');
            $item.addClass('item');

            $item.text('\n            [' + tag + '] ' + body + ' ( ' + date + ' )\n          ');

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

},{"../module/BtcSpreadSheet":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./Router":5}],5:[function(require,module,exports){
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
      var $body = $('body');

      _ns2.default.page = _ns2.default.page || {};

      (0, _common2.default)();

      page('/', _root2.default);
      page('documents/analytic-signal/', _analyticSignal2.default);
    }
  }]);

  return Router;
}();

exports.default = Router;

},{"../page/common":7,"../page/documents/analytic-signal":8,"../page/root":9,"./ns":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ns = require('../module/ns');

var _ns2 = _interopRequireDefault(_ns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  console.log('page common');

  setEnvClass();
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

},{"../module/ns":6}],8:[function(require,module,exports){
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

},{"../../module/BtcAnalyticSignalViewer":1,"../../module/ns":6}],9:[function(require,module,exports){
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

},{"../module/BtcNews":2,"../module/ns":6}],10:[function(require,module,exports){
'use strict';

var _ns = require('./module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Main = require('./module/Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// エントリーポイント。indexからはライブラリとこれしか呼ばない

_ns2.default.main = new _Main2.default();

},{"./module/Main":4,"./module/ns":6}]},{},[10]);
