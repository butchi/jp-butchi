import ns from '../../module/ns';
import BtcAnalyticSignalViewer from '../../module/BtcAnalyticSignalViewer';

export default class PageDocumentsAnalyticSignal {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    $('.item-as').each((i, elm) => {
      this.btcAnalyticSignalViewer = new BtcAnalyticSignalViewer({
        elm: elm.querySelector('.btc-analytic-signal-viewer'),
      });
    });
  }
}
