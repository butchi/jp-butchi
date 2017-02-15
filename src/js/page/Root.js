import ns from '../module/ns';
import BtcNews from '../module/BtcNews';

export default () => {
  console.log('index page');

  ns.page.btcNews = new BtcNews();
};
