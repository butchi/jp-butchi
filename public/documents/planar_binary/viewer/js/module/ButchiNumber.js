window.licker = window.licker || {};
window.licker.module = window.licker.module || {};
(function(ns, app) {
	function ButchiNumber(n) {
		this.number = 0;
		this.canvas = new ns.module.BNCanvas();
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		// this.array = new Array(this.width, this.height);
		this.setNumber(n || 0);
	}

	ButchiNumber.prototype.setNumber = function(n) {
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
	ButchiNumber.prototype.incr = function() {
		var i1,i2,j1,j2;
		this.number++;
		
		if (this.getDigit(0,0)==0) {
			this.setDigit(0,0,1);
			return 0;
		}
		this.setDigit(0,0,0);

		i1=1,j1=0,i2=0,j2=1;
		while (i1!=i2 || j1!=j2) {
			while (j1<j2) {
				if (this.getDigit(i1,j1)==1) {
					if (i1<this.width){
						this.setDigit(i1,j1,0);
						i1++;
					} else {
						return 2;
					}
				} else {
					if (j1<this.height){
						this.setDigit(i1,j1,1);
						j1++;
					} else {
						return 2;
					}
				}
			}
			while (i2<i1) {
				if (this.getDigit(i2,j2)==1) {
					if (j2<this.height){
						this.setDigit(i2,j2,0);
						j2++;
					} else {
						return 2;
					}
				} else {
					if (i2<this.width){
						this.setDigit(i2,j2,1);
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
	ButchiNumber.prototype.decr = function() {
		var i1,i2,j1,j2;
		this.number--;

		if (this.getDigit(0,0)==1) {
			this.setDigit(0,0,0);
			return 0;
		}
		this.setDigit(0,0,1);

		i1=1,j1=0,i2=0,j2=1;
		while (i1!=i2 || j1!=j2) {
			while (j1<j2) {
				if (this.getDigit(i1,j1)==0) {
					if (i1<this.width){
						this.setDigit(i1,j1,1);
						i1++;
					} else {
						return 2;
					}
				} else {
					if (j1<this.height){
						this.setDigit(i1,j1,0);
						j1++;
					} else {
						return 2;
					}
				}
			}
			while (i2<i1) {
				if (this.getDigit(i2,j2)==0) {
					if (j2<this.height){
						this.setDigit(i2,j2,1);
						j2++;
					} else {
						return 2;
					}
				} else {
					if (i2<this.width){
						this.setDigit(i2,j2,0);
						i2++;
					} else {
						return 2;
					}
				}
			}
		}
		return 0;
	};

	ButchiNumber.prototype.setDigit = function(x, y, flag) {
		this.canvas.bmp.data[4 * (y*this.width + x) + 3] = (flag==1)?255:0;
	}

	ButchiNumber.prototype.getDigit = function(x, y) {
		return (this.canvas.bmp.data[4 * (y*this.width + x) + 3]==255)?1:0;
	}

	ButchiNumber.prototype.draw = function() {
		this.canvas.ctx.putImageData(this.canvas.bmp,0,0);
		this.canvas.dispCtx.clearRect(0,0,this.width,this.height);
		this.canvas.dispCtx.drawImage(this.canvas.ctx.canvas, 0, 0);
	}

	app.ButchiNumber = ButchiNumber;
}(window.licker, window.licker.module));
