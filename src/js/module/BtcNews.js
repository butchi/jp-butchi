import BtcSpreadSheet from '../module/BtcSpreadSheet';

export default class BtcNews {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts = {}) {
    this.$elm = opts.$elm || $('.btc-news');

    this.btcSpreadSheet = new BtcSpreadSheet({
      sheetId: '18Vf0-hu_ho6vdRSSrsQAy793OqdVpn6OCE9XCMsmtns',
      callback: (data) => {
        let $list = $('<ul></ul>');
        $list.addClass('list');

        data.reverse().forEach((item) => {
          let date = item.date;
          let body = item.body;
          let tag = item.tag;

          let $item = $('<li></li>');
          $item.addClass('item');

          $item.html(`
            [${tag}] ${body} ( ${date} )
          `);

          $list.append($item);
        });

        this.$elm.append($list);
      }
    });
  }
}
