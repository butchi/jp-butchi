import ns from './ns';
import PageCommon from '../page/Common';
import PageRoot from '../page/Root';
import PageDocumentsAnalyticSignal from '../page/documents/analytic-signal';

export default class Router {
  constructor() {
    this.initialize();
  }

  initialize() {
    const $body = $('body');

    this.pageCommon = new PageCommon();

    if($body.hasClass('page---root')) {
      this.pageRoot = new PageRoot();
    }

    if($body.hasClass('page---documents--analytic-signal')) {
      this.pageDocumentsAnalyticSignal = new PageDocumentsAnalyticSignal();
    }
  }
}
