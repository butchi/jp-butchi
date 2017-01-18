export default class BtcSpreadSheet {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts = {}) {
    this.sheetId = opts.sheetId;
    this.callback = opts.callback || _.noop;
    this.failed = opts.failed || _.noop;

    $.ajax({
      url: `https://spreadsheets.google.com/feeds/list/${this.sheetId}/od6/public/basic?alt=json-in-script`,
      type: 'GET',
      dataType: 'jsonp',
    }).then((data) => {
      let entryArr = data.feed.entry;

      let ret = [];

      entryArr.forEach((entry) => {
        let rowArr = entry.content.$t.split(', ');
        let obj = {};

        rowArr.forEach((row) => {
          let keyVal = (row.split(': '));
          obj[keyVal[0]] = keyVal.slice(1); 
        });

        ret.push(obj);
      });

      this.callback(ret);
    }).fail((err) => {
      this.failed(err);
    });
  }
}