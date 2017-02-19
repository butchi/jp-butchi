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

},{}],3:[function(require,module,exports){
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

},{"../module/BtcSpreadSheet":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"./Router":7}],7:[function(require,module,exports){
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

},{"../page/common":9,"../page/documents/analytic-signal":10,"../page/documents/butchi-number":11,"../page/root":12,"./ns":8}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ns = require('../module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _BtcSwfObject = require('../module/BtcSwfObject');

var _BtcSwfObject2 = _interopRequireDefault(_BtcSwfObject);

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

},{"../module/BtcSwfObject":5,"../module/ns":8}],10:[function(require,module,exports){
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

},{"../../module/BtcAnalyticSignalViewer":1,"../../module/ns":8}],11:[function(require,module,exports){
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

},{"../../module/BtcButchiNumberViewer":2,"../../module/ns":8}],12:[function(require,module,exports){
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

},{"../module/BtcNews":3,"../module/ns":8}],13:[function(require,module,exports){
'use strict';

var _ns = require('./module/ns');

var _ns2 = _interopRequireDefault(_ns);

var _Main = require('./module/Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// エントリーポイント。indexからはライブラリとこれしか呼ばない

_ns2.default.main = new _Main2.default();

},{"./module/Main":6,"./module/ns":8}]},{},[13]);
