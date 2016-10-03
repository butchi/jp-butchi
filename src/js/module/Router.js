import ns from './ns';
import PageCommon from '../page/Common';
import PageRoot from '../page/Root';

export default class Router {
  constructor() {
    this.initialize();
  }

  initialize() {
    const $body = $('body');

    this.pageCommon = new PageCommon();

    if($body.hasClass('page-root')) {
      this.pageRoot = new PageRoot();
    }
  }
}
