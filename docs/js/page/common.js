import "https://code.jquery.com/jquery-3.6.4.min.js"
import ns from "../module/ns.js"
// import Hashaby from "hashaby"

export default _ => {
    console.log("page common")

    setEnvClass()

    // document.addEventListener("mdl-componentupgraded", _evt => {
    //     ns.hashaby = new Hashaby({
    //         sweetScrollContainer: ".mdl-layout__content",
    //         immediate: true,
    //     })
    // })
}

const setEnvClass = _ => {
    const $html = $("html")

    ns.isSp = false
    ns.isPc = false
    ns.isTab = false

    if ($html.hasClass("is-sp")) {
        ns.isSp = true
    }
    if ($html.hasClass("is-pc")) {
        ns.isPc = true
    }
    if ($html.hasClass("is-tab")) {
        ns.isTab = true
    }
}
