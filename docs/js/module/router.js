import ns from "/js/module/ns.js"

import common from "/js/page/common.js"
// import pageRoot from "/js/page/root.js"
// import pageWorks from "/js/page/works.js"
// import documents__analytic_signal from "../page/documents/analytic-signal"
// import documents__butchi_number from "../page/documents/butchi-number"

const page = (path, callback) => {
    if (document.querySelector(`body[data-path="${path}"]`)) {
        callback()
    }
}

export default class Router {
    constructor() {
        this.initialize()
    }

    initialize() {
        console.log("Hello, world!")

        ns.page = ns.page || {};

        common();

        // page("/", pageRoot);
        // page("works/", pageWorks);
        // page("documents/analytic-signal/", documents__analytic_signal);
        // page("documents/butchi-number/", documents__butchi_number);

        console.log("Thanks, world!")
    }
}
