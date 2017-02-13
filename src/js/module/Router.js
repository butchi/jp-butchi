import ns from './ns';
import PageCommon from '../page/Common';
import PageRoot from '../page/Root';
import PageDocumentsAnalyticSignal from '../page/documents/analytic-signal';

export default class Router {
  constructor() {
    this.initialize();
  }

  initialize() {
    function matchQs(selector) {
      return !!document.querySelector(selector);
    };

    const $body = $('body');

    this.pageCommon = new PageCommon();

    if(matchQs('body[data-path="/"]')) {
      this.pageRoot = new PageRoot();
    }

    if(matchQs('body[data-path="documents/analytic-signal/"]')) {
      this.pageDocumentsAnalyticSignal = new PageDocumentsAnalyticSignal();
    }
  }
}
