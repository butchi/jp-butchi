class BtcSwfObject {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts = {}) {
    this.elm = opts.elm;

    this.width = opts.width || this.elm.getAttribute('data-width') || 610;
    this.height = opts.height || this.elm.getAttribute('data-height') || 377;

    this.version = opts.version || this.elm.getAttribute('data-version') || 10;

    this.src = opts.src || this.elm.getAttribute('data-src');

    swfobject.embedSWF(this.src, this.elm, this.width, this.height, 10);
  }
}

$('.btc-swf-object').each((i, elm) => {
  new BtcSwfObject({
    elm,
  });
});

export default BtcSwfObject;