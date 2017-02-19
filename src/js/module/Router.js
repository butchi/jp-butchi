import ns from './ns';

import common from '../page/common';
import root from '../page/root';
import documents__analytic_signal from '../page/documents/analytic-signal';
import documents__butchi_number from '../page/documents/butchi-number';

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
    ns.page = ns.page || {};

    common();

    page('/', root);
    page('documents/analytic-signal/', documents__analytic_signal);
    page('documents/butchi-number/', documents__butchi_number);
  }
}
