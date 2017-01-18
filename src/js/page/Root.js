import ns from '../module/ns';
import BtcNews from '../module/BtcNews';

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    console.log('index page');

    this.btcNews = new BtcNews();
  }
}
