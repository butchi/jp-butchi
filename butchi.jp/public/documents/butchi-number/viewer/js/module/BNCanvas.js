window.licker = window.licker || {};
window.licker.module = window.licker.module || {};
(function(ns, app) {
	function BNCanvas() {
		this.elm = document.getElementById('butchi_number');
		this.width = this.elm.width;
		this.height = this.elm.height;
		this.ctx = this.elm.getContext('2d');
		var dispCanvas = document.getElementById('display_butchi_number');
		this.dispCtx = dispCanvas.getContext('2d');
		this.dispCtx.transform(-1, 0, 0, -1, 0, 0);
		this.dispCtx.translate(-this.width, -this.height);
		this.bmp = this.ctx.createImageData(this.width, this.height);
	}

	app.BNCanvas = BNCanvas;
}(window.licker, window.licker.module));
