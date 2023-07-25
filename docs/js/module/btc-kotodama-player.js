import "https://code.jquery.com/jquery-3.6.4.min.js"
import { LitElement, html, css } from "/js/lib/lit-core.min.js"

// from [Web Audio APIを利用してオーディオビジュアライザを作成する ~その2 再生中の音から波形データを取得して描画する~ - Qiita](http://qiita.com/soarflat/items/4aa001dac115a4af6dbe)

export class BtcKotodamaPlayer extends LitElement {
    isVirgin = true

    // ビジュアライザ
    initVisualizer() {
        this.playFlag = true

        this.sourceNode = this.audioCtx.createBufferSource();               // AudioBufferSourceNodeを作成
        this.sourceNode.buffer = this.audioBuffer;                          // 取得した音声データ(バッファ)を音源に設定
        this.analyserNode = this.audioCtx.createAnalyser();                 // AnalyserNodeを作成
        this.times = new Float32Array(this.analyserNode.frequencyBinCount); // 時間領域の波形データを格納する配列を生成 
        this.sourceNode.connect(this.analyserNode);                         // AudioBufferSourceNodeをAnalyserNodeに接続
        this.analyserNode.connect(this.audioCtx.destination);               // AnalyserNodeをAudioDestinationNodeに接続
        this.sourceNode.start(0);                                           // 再生開始

        this.sourceNode.onended = _ => {
            this.elm.setAttribute("data-is-play", false)

            this.playFlag = false

            this.ctx.clearRect(0, 0, this.width, this.height)
        }
    }

    draw() {
        const inv = n => {
            if (n === 0) {
                return 0
            } else {
                return 1 / (n * Math.PI)
            }
        }

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

    // fetchを利用して音声データ(バッファ)を読み込む。
    async loadBuffer() {
        const res = await fetch(this.audioSrc)
        this.arrayBuffer = await res.arrayBuffer()

        // 取得したデータをデコードする。
        this.audioBuffer = await this.audioCtx.decodeAudioData(this.arrayBuffer)
    }

    // 読み込んだ音声データ(バッファ)を再生と波形データの描画を開始する。
    playSound() {
        this.initVisualizer()
    }

    firstUpdated() {
        this.elm = this.shadowRoot.host

        this.audioElm = this.elm.querySelector("audio")

        this.audioSrc = this.audioElm.getAttribute("src")

        this.canvasElm = document.createElement("canvas")

        this.shadowRoot.appendChild(this.canvasElm)

        this.canvasElm.width = 360
        this.canvasElm.height = 360

        this.kernelLen = 127
        this.amp = 256

        this.width = 360
        this.height = 360

        this.ctx = this.canvasElm.getContext("2d")

        this.canvasElm.width = this.width
        this.canvasElm.height = this.height

        this.elm.addEventListener("click", async _evt => {
            if (this.isVirgin) {
                // AudioNodeを管理するAudioContextの生成
                this.audioCtx = new globalThis.AudioContext()

                this.analyser = this.audioCtx.createAnalyser()

                await this.loadBuffer()
            }

            this.isVirgin = false

            if (this.playFlag) {
                return
            }

            this.playSound()  // デコードされたデータを再生する。

            this.draw();      // 描画開始

            this.elm.setAttribute("data-is-play", true)
        })
    }

    render() {
        return html`
        <slot></slot>
        `
    }
}
