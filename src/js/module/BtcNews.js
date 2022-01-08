import $ from "jquery"
import moment from "moment"
import BtcSpreadSheet from "../module/BtcSpreadSheet"

export default class BtcNews {
  constructor(opts = {}) {
    this.initialize(opts)
  }

  initialize(opts = {}) {
    const $elm = this.$elm = opts.$elm || $(".btc-news")

    this.btcSpreadSheet = new BtcSpreadSheet({
      sheetId: "18Vf0-hu_ho6vdRSSrsQAy793OqdVpn6OCE9XCMsmtns",
      callback: (data) => {
        const $list = $("<ul></ul>")
        $list.addClass("list")

        data.reverse().forEach((item) => {
          const date = item.date
          const body = item.body
          const tag = item.tag
          const dateMoment = moment(date)
          const dateFormat = dateMoment.format("Y年M月D日")

          let $item = $("<li></li>")
          $item.addClass("item")

          $item.html(
            `[${tag}] ${body} ( ${dateFormat} )`
          )

          $list.append($item)
        })

        $elm.append($list)
      },
    })
  }
}
