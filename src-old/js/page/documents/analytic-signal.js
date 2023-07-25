import $ from "jquery"
import ns from "../../module/ns"
import BtcAnalyticSignalViewer from "../../module/BtcAnalyticSignalViewer"

export default _ => {
  console.log("page analytic-signal")

  $(".item-as").each((i, elm) => {
    ns.page.btcAnalyticSignalViewer = new BtcAnalyticSignalViewer({
      elm: elm.querySelector(".btc-analytic-signal-viewer"),
    })
  })
}
