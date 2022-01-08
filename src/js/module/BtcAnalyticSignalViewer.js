import $ from "jquery"

// from [Web Audio APIを利用してオーディオビジュアライザを作成する ~その2 再生中の音から波形データを取得して描画する~ - Qiita](http://qiita.com/soarflat/items/4aa001dac115a4af6dbe)

// AudioNodeを管理するAudioContextの生成
const AudioCtx = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioCtx()

const inv = n => {
  if (n === 0) {
    return 0
  } else {
    return 1 / (n * Math.PI)
  }
}


/**
 * 音声ファイルローダー
 */
class Loader {
  constructor(opts = {}) {
    this.url = opts.url  // 読み込む音声データのURL
    this.elm = opts.elm
    this.ctx = opts.ctx
    this.amp = opts.amp
    this.kernelLen = opts.kernelLen
    this.width = opts.width
    this.height = opts.height
  }

  // XMLHttpRequestを利用して音声データ(バッファ)を読み込む。
  loadBuffer() {
    let loader, request
    loader = this
    request = new XMLHttpRequest()
    request.open("GET", this.url, true)
    request.responseType = "arraybuffer"

    let _this = this

    request.onload = _ => {
      // 取得したデータをデコードする。
      audioCtx.decodeAudioData(this.response, buffer => {
        if (!buffer) {
          console.log("error")
          return
        }

        $(_this.elm).on("click", (_evt) => {
          $(_this.elm).addClass("is-play")

          loader.playSound(buffer)  // デコードされたデータを再生する。
        })
      }, _err => {
        console.log("decodeAudioData error")
      })
    }

    request.onerror = _ => {
      console.log("Loader: XHR error")
    }

    request.send()
  }

  // 読み込んだ音声データ(バッファ)を再生と波形データの描画を開始する。
  playSound(buffer) {
    var visualizer = new Visualizer(buffer, {
      elm: this.elm,
      width: this.width,
      height: this.height,
      ctx: this.ctx,
      amp: this.amp,
      kernelLen: this.kernelLen,
    })
  }
}


/**
 * ビジュアライザー
 */
class Visualizer {
  constructor(buffer, opts = {}) {
    this.elm = opts.elm

    this.playFlag = true

    this.ctx = opts.ctx

    this.amp = opts.amp
    this.kernelLen = opts.kernelLen

    this.width = opts.width || 256
    this.height = opts.height || 256

    this.sourceNode = audioCtx.createBufferSource();  // AudioBufferSourceNodeを作成
    this.sourceNode.buffer = buffer;                  // 取得した音声データ(バッファ)を音源に設定
    this.analyserNode = audioCtx.createAnalyser();    // AnalyserNodeを作成
    this.times = new Float32Array(this.analyserNode.frequencyBinCount);  // 時間領域の波形データを格納する配列を生成 
    this.sourceNode.connect(this.analyserNode);       // AudioBufferSourceNodeをAnalyserNodeに接続
    this.analyserNode.connect(audioCtx.destination);  // AnalyserNodeをAudioDestinationNodeに接続
    this.sourceNode.start(0);                         // 再生開始
    this.draw();                                      // 描画開始

    this.sourceNode.onended = _ => {
      $(this.elm).removeClass("is-play")

      this.playFlag = false
    }
  }

  draw() {
    // 0~1まで設定でき、0に近いほど描画の更新がスムーズになり, 1に近いほど描画の更新が鈍くなる。
    this.analyserNode.smoothingTimeConstant = 0.5

    // FFTサイズを指定する。デフォルトは2048。
    this.analyserNode.fftSize = 2048

    // 時間領域の波形データを引数の配列に格納するメソッド。
    // analyserNode.fftSize / 2の要素がthis.timesに格納される。今回の配列の要素数は1024。
    this.analyserNode.getFloatTimeDomainData(this.times)


    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.beginPath()

    let len = this.analyserNode.frequencyBinCount - this.kernelLen
    for (let i = this.kernelLen; i < len; i++) {
      let hilbTmp = 0
      for (let k = - this.kernelLen; k <= this.kernelLen; k++) {
        hilbTmp += inv(k) * (this.times[i + k] || 0)
      }
      let x = this.width / 2 + this.amp * this.times[i]
      let y = this.height / 2 - this.amp * hilbTmp
      this.ctx.lineTo(x, y)
    }
    this.ctx.stroke()

    window.requestAnimationFrame(() => {
      if (this.playFlag) {
        this.draw()
      }
    })
  }
}


export default class BtcAnalyticSignalViewer {
  constructor(opts = {}) {
    this.initialize(opts)
  }

  initialize(opts = {}) {
    this.elm = opts.elm || document.querySelector(".btc-analytic-signal-viewer")

    const url = $(this.elm).attr("data-src")

    this.$canvas = $(`<canvas class="elm-canvas"></canvas>`)

    $(this.elm).append(this.$canvas)

    this.canvasElm = this.$canvas.get(0)
    this.canvasElm.width = 256
    this.canvasElm.height = 256

    this.audioElm = this.elm.querySelector(".elm-audio")

    this.kernelLen = opts.kernelLen || 127
    this.amp = opts.amp || 128

    this.width = opts.width || 256
    this.height = opts.height || 256

    this.ctx = this.canvasElm.getContext("2d")

    this.canvasElm.width = this.width
    this.canvasElm.height = this.height

    this.analyser = audioCtx.createAnalyser()

    let loader = new Loader({
      elm: this.elm,
      ctx: this.ctx,
      width: this.width,
      height: this.height,
      url,
      amp: 256,
      kernelLen: this.kernelLen,
    })
    loader.loadBuffer()
  }
}
