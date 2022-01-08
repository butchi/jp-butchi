import BtcButchiNumberViewer from '../../module/BtcButchiNumberViewer';

export default () => {
  console.log("page butchi-number")

  new BtcButchiNumberViewer({
    elm: document.querySelector(".btc-butchi-number-viewer"),
    width: 256,
    height: 256,
    initialNumber: 1000,
  })
}
