//グラフ定義用のクラス
function myGraph(window){
	this.mc = window;
	this.x = window._x;
	this.y = window._y
	this.width = window._width;
	this.height = window._height;
	//デフォルト値
	this.left = -4.0;
	this.right = 4.0;
	this.top = 3.0;
	this.bottom = -3.0;
}
//グラフ表示領域の絶対座標への変換関数
myGraph.prototype.dispx = function(x){
	return (x - this.left)*this.width/this.xspan();
}
myGraph.prototype.dispy = function(y){
	return - (y - this.top)*this.height/this.yspan();
}
//絶対座標のグラフ座標への変換関数
myGraph.prototype.graphx = function(x){
	return x*this.xspan()/this.width + this.left;
}
myGraph.prototype.graphy = function(y){
	return -y*this.yspan()/this.height + this.top;
}
myGraph.prototype.xspan = function() {
	return this.right - this.left;
}
myGraph.prototype.yspan = function() {
	return this.top - this.bottom;
}
myGraph.prototype.setXrange = function(l, r) {
	if(r > l){
		this.left = l;
		this.right = r;
		return true;
	} else return false;
}
myGraph.prototype.setYrange = function(b, t) {
	if(t > b){
		this.top = t;
		this.bottom = b;
		return true;
	} else return false;
}
//ムービークリップの初期化と軸の描画、マスク処理を行う
myGraph.prototype.create = function() {
//	this.graphMC = this.mc.createEmptyMovieClip("graph_mc",2); ->plotに移動@101
	this.baseMC = this.mc.createEmptyMovieClip("base_mc", 1);
	with (this.baseMC) {
		clear();
		//軸の描画
		lineStyle(1, 0x000000);
		moveTo(this.dispx(this.left), this.dispy(0));
		lineTo(this.dispx(this.right), this.dispy(0));
		moveTo(this.dispx(0), this.dispy(this.bottom));
		lineTo(this.dispx(0), this.dispy(this.top));
	}
	//軸矢印の描画(移動)
	_root.xarrow._x=this.mc._x+this.dispx(this.right);
	_root.xarrow._y=this.mc._y+this.dispy(0);
	_root.yarrow._x=this.mc._x+this.dispx(0);
	_root.yarrow._y=this.mc._y+this.dispy(this.top);
	//全体にマスクをかける
	this.maskMC = this.mc.duplicateMovieClip("mask_mc", 2);  //4でなく2でも大丈夫だよね？@101
	g1.mc.setMask(this.maskMC);
};
//グラフを描画する 多少改良@101
myGraph.prototype.plot = function(func, depth) { //depthは2以上(1は軸描画用(create))
	func.graphMC = this.mc.createEmptyMovieClip("graph_mc"+depth, depth); //createから移動@101
	for(t=func.t0; t<=func.t1; t+=func.tspan()/(func.samples-1)){
		x2 = this.dispx(func.x(t));
		y2 = this.dispy(func.y(t));
		if(plotFlag != true){
			with (func.graphMC){
				clear();
				lineStyle(2, 0x0033FF);
				moveTo(x2, y2);
			}
			plotFlag = true;
		} else {
			func.graphMC.lineTo(x2, y2);
		}
	}
	plotFlag = false;
};
function myFunction() {
	//デフォルト値の設定
	this.samples = 100;
	this.x = function(t){
		return t;
	}
	this.y = function(t){
		return t;
	}
	this.t0 = 0;
	this.t1 = 10
}
myFunction.prototype.setSamples = function(samp){
	if(samp>0){
		this.samples = samp;
		return true;
	} else return false;
}
//媒介変数の変域設定
myFunction.prototype.setTrange = function(s, e) {
	if(e > s){
		this.t0 = s;
		this.t1 = e;
		return true;
	} else return false;
}
myFunction.prototype.tspan = function() {
	return this.t1 - this.t0;
}
