const max = 6900;
const min = 0;

let touchStart = ('ontouchstart' in window) ? 'touchstart' : 'mousedown';
let touchEnd = ('ontouchend' in window) ? 'touchend' : 'mouseup';

let bn;

export default class BtcButchiNumberViewer {
  constructor(opts = {}) {
    $(function() {
      this.elm = opts.elm;
      const $elm = $(this.elm);

      this.touching = false;

      this.initialNumber = opts.initialNumber;

      this.elm.innerHTML = `
<p><input class="input-number" type="number" value="1000"></p>
<canvas class="display-butchi-number"></canvas>

<div class="area-tap">
  <p class="btn" data-operation="up"></p>
  <p class="btn" data-operation="down"></p>
</div>
      `;

      this.$upBtn = $elm.find('.btn[data-operation="up"]');
      this.$downBtn = $elm.find('.btn[data-operation="down"]');

      this.$inputNumber = $('.input-number');
      this.$inputNumber.attr('max', max);
      this.$inputNumber.attr('min', min);

      this.$inputNumber.on('change', function(e){
        var val = parseInt($(this).val(), 10);
        if(isFinite(val) && val >= min && val < max) {
          bn.setNumber(val);
          bn.draw();
        }
      });

      bn = new ButchiNumber({
        elm: this.elm,
        initialNumber: this.initialNumber,
      });

      bn.draw();

      this.$upBtn.on(touchStart, (evt) => {
        evt.preventDefault();

        let cnt = 0;

        const loop = () => {
          if(bn.number < max) {
            bn.incr();
            bn.draw();
            this.$inputNumber.val(bn.number);
          }

          if(this.touching) {
            setTimeout(() => {
              cnt++;
              loop();
            }, (cnt === 0) ? 500 : 10);
          }
        };

        this.touching = true;

        loop();
      });

      this.$downBtn.on(touchStart, (evt) => {
        evt.preventDefault();

        let cnt = 0;

        const loop = () => {
          if(bn.number > min) {
            bn.decr();
            bn.draw();
            this.$inputNumber.val(bn.number);
          }

          if(this.touching) {
            setTimeout(() => {
              cnt++;
              loop();
            }, (cnt === 0) ? 500 : 10);
          }
        };

        this.touching = true;

        loop();
      });

      $('body').on(touchEnd, () => {
        this.touching = false;
      });

      $elm.find('.area-tap .btn').on('mouseout', () => {
        this.touching = false;
      });
    });
  }
}

class BNCanvas {
  constructor(opts = {}) {
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
  }
}

class ButchiNumber {
  constructor(opts = {}) {
    this.elm = opts.elm;

    this.number = 0;

    this.canvas = new BNCanvas({
      width: 256,
      height: 256,
    });
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.setNumber(opts.initialNumber);
  }

  setNumber(n) {
    if(n > this.number) {
      while(this.number < n) {
        this.incr();
      }
    } else if(n < this.number) {
      while(this.number > n) {
        this.decr();
      }
    }
  }

  // インクリメント則に従って1を加算。オーバーフロー時は2を返して正常に加算されない
  incr() {
    var i1, i2, j1, j2;
    this.number++;
    
    if (this.getDigit(0, 0)==0) {
      this.setDigit(0, 0, 1);
      return 0;
    }
    this.setDigit(0, 0, 0);

    i1 = 1, j1 = 0, i2 = 0, j2 = 1;
    while (i1 != i2 || j1 != j2) {
      while (j1 < j2) {
        if (this.getDigit(i1, j1) == 1) {
          if (i1 < this.width){
            this.setDigit(i1, j1, 0);
            i1++;
          } else {
            return 2;
          }
        } else {
          if (j1 < this.height){
            this.setDigit(i1, j1, 1);
            j1++;
          } else {
            return 2;
          }
        }
      }
      while (i2 < i1) {
        if (this.getDigit(i2, j2)==1) {
          if (j2 < this.height){
            this.setDigit(i2, j2, 0);
            j2++;
          } else {
            return 2;
          }
        } else {
          if (i2 < this.width){
            this.setDigit(i2, j2, 1);
            i2++;
          } else {
            return 2;
          }
        }
      }
    }
    return 0;
  };

  // デクリメント則に従って1を減算。負の数には対応していない
  decr() {
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
          if (i1 < this.width){
            this.setDigit(i1, j1, 1);
            i1++;
          } else {
            return 2;
          }
        } else {
          if (j1 < this.height){
            this.setDigit(i1, j1, 0);
            j1++;
          } else {
            return 2;
          }
        }
      }
      while (i2 < i1) {
        if (this.getDigit(i2, j2)==0) {
          if (j2 < this.height){
            this.setDigit(i2, j2, 1);
            j2++;
          } else {
            return 2;
          }
        } else {
          if (i2 < this.width){
            this.setDigit(i2, j2, 0);
            i2++;
          } else {
            return 2;
          }
        }
      }
    }
    return 0;
  };

  setDigit(x, y, flag) {
    this.canvas.bmp.data[4 * (y * this.width + x) + 3] = (flag == 1) ? 255 : 0;
  }

  getDigit(x, y) {
    return (this.canvas.bmp.data[4 * (y * this.width + x) + 3] == 255) ? 1 : 0;
  }

  draw() {
    this.canvas.ctx.putImageData(this.canvas.bmp, 0, 0);
    this.canvas.dispCtx.clearRect(0, 0, this.width,this.height);
    this.canvas.dispCtx.drawImage(this.canvas.ctx.canvas, 0, 0);
  }
}
