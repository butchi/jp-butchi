import ns from './ns';

import page from 'page';

import common from '../page/common';
import root from '../page/root';
import documents__analytic_signal from '../page/documents/analytic-signal';

export default class Router {
  constructor() {
    this.initialize();
  }

  initialize() {
    common();

    ns.page = ns.page || {};

    page('/', root);
    page('/documents/analytic-signal/', documents__analytic_signal);

    page();
  }
}
