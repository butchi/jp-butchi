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
//ムービークリップの初期化と軸の描画、マスク処理、グラフ用ムービークリップ作成
//ムービークリップの構成をスマートに@103
myGraph.prototype.create = function() {
	//全体(maskMCの親mc)にマスクをかける
	this.maskMC = this.mc.duplicateMovieClip("mask_mc", this.mc.getNextHighestDepth());
	g1.mc.setMask(this.maskMC);
	//土台の作成
	this.baseMC = this.mc.createEmptyMovieClip("base_mc", this.mc.getNextHighestDepth());
	with (this.baseMC) {
		clear();
		//軸の描画
		lineStyle(1, 0x000000);
		moveTo(this.dispx(this.left), this.dispy(0));
		lineTo(this.dispx(this.right), this.dispy(0));
		moveTo(this.dispx(0), this.dispy(this.bottom));
		lineTo(this.dispx(0), this.dispy(this.top));
	}
	//矢印のつけ方変更@103
	this.baseMC.attachMovie("xarrow", "xarrow_mc", this.baseMC.getNextHighestDepth(),
		{
		_x:this.dispx(this.right),
		_y:this.dispy(0)
		}
	);
	this.baseMC.attachMovie("yarrow", "yarrow_mc", this.baseMC.getNextHighestDepth(),
		{
		_x:this.dispx(0),
		_y:this.dispy(this.top)
		}
	);

	//グラフ描画領域の作成
	this.graphMC = this.mc.createEmptyMovieClip("graph_mc", this.mc.getNextHighestDepth()); //グラフ描画領域として作り直し@103
};
//目盛りの描画@103
myGraph.prototype.placetics = function(xy, type, props) {
	if(props.start == props.end){
		if(xy=="x"){
			start = Math.floor(this.left);
			end = Math.floor(this.right);
		} else if(xy=="y"){
			start = Math.floor(this.bottom);
			end = Math.floor(this.top);
		} else trace("xy?");
	} else {
		start = props.start;
		end = props.end;
	}
	switch (type) {
	case "num" :
		for(t=start; t<=end; t+=props.span){
			x = (xy=="x")? t : 0;
			y = (xy=="y")? t : 0;
			depth = this.baseMC.getNextHighestDepth();
			tx = this.baseMC.createTextField("my_txt"+depth, depth, this.dispx(x), this.dispy(y), 50, 20);
//			fmt = new TextFormat();
			tx.text = (t==0)? "O" : t;
			//座標の調整（手抜き）
			tx._x -= (xy=="x" && t!=0)? tx.textWidth/2 : 0;
			tx._y -= (xy=="y" && t!=0)? tx.textHeight/2 : 0;
//			tx.setTextFormat(fmt);
		}
		break;
	case "rad" :
		pi = 2*Math.asin(1);
		for(t=start; t<=end; t+=props.span*pi){
			k = props.span*Math.floor(t/pi/props.span); //πの係数
			x = (xy=="x")? k*pi : 0;
			y = (xy=="y")? k*pi : 0;
			tx = this.baseMC.createTextField("my_txt", this.baseMC.getNextHighestDepth(), this.dispx(x), this.dispy(y), 50, 20);
//			fmt = new TextFormat();
			if(k==0){
				tx.text = "O";
			} else if(k==1){
				tx.text = "π";
			} else {
				tx.text = k + "π";
			}
			//座標の調整（手抜き）
			tx._x -= (xy=="x" && k!=0)? tx.textWidth/2 : 0;
			tx._y -= (xy=="y" && k!=0)? tx.textHeight/2 : 0;
//			tx.setTextFormat(fmt);
		}
		break;
	case "deg" :
		break;
	default :
		break;
	}
};
//グラフを描画する 多少改良@101 不連続のための処理@102 depth制御、ムービークリップ扱い変更@103
myGraph.prototype.plot = function(func) {
	if(func.graphMC == undefined){ //初描画
		if(func.depth == undefined){ //func.depthに指定があれば深さを指定して描く
			depth = this.graphMC.getNextHighestDepth();
		} else {
			depth = func.depth;
		}
		func.graphMC = this.graphMC.createEmptyMovieClip("graph_mc"+depth, depth);
	}

	func.graphMC.clear();
	for(t=func.t0; t<=func.t1; t+=func.tspan()/(func.samples-1)){
		if(Math.abs(this.graphy(y2) - func.y(t)) > 10.0) plotFlag=false; //ここの処理が肝
		x2 = this.dispx(func.x(t));
		y2 = this.dispy(func.y(t));
		if(plotFlag != true){
			with (func.graphMC){
				lineStyle(func.line.thickness, func.line.rgb, func.line.alpha); //拡張(Flash8用にさらに拡張可能)@102
				moveTo(x2, y2);
			}
			plotFlag = true;
		} else {
			func.graphMC.lineTo(x2, y2);
		}
	}
	plotFlag = false;
};
myGraph.prototype.setLabel = function(label, x, y) {
	depth = this.baseMC.getNextHighestDepth();
	tx = this.baseMC.createTextField("label"+depth, depth, this.dispx(x), this.dispy(y), 30, 20);
//	fmt = new TextFormat();
	tx.text = label;
	tx._y -= tx.textHeight; //座標の調整（手抜き）
//	tx.setTextFormat(fmt);
};
//グラフを消す(改良の余地はあるかも)@102
//myGraph.prototype.clear = function(func) {
//	func.graphMC.clear();
//};
//グラフを消去する@103
myGraph.prototype.remove = function(func) {
	func.graphMC.removeMovieClip();
	delete func.graphMC;
};

/**************************************************************/

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
	this.t1 = 10;
	this.line = {thickness:2, rgb:0x000000, alpha:100};  //追加@102
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
