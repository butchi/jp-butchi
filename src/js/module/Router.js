import ns from './ns';

import common from '../page/common';
import root from '../page/root';
import documents__analytic_signal from '../page/documents/analytic-signal';

function page(path, callback) {
  if(document.querySelector(`body[data-path="${path}"]`)) {
    callback();
  }
};

export default class Router {
  constructor() {
    this.initialize();
  }

  initialize() {
    const $body = $('body');

    ns.page = ns.page || {};

    common();

    page('/', root);
    page('documents/analytic-signal/', documents__analytic_signal);
  }
}
