import ns from '../module/ns';
import Hashaby from 'hashaby';

export default () => {
  console.log('page common');

  setEnvClass();

  document.addEventListener('mdl-componentupgraded', (_evt) => {
    ns.hashaby = new Hashaby({
      sweetScrollContainer: '.mdl-layout__content',
      immediate: true,
    });
  });
};

function setEnvClass() {
  const $html = $('html');

  ns.isSp = false;
  ns.isPc = false;
  ns.isTab = false;

  if($html.hasClass('is-sp')) {
    ns.isSp = true;
  }
  if($html.hasClass('is-pc')) {
    ns.isPc = true;
  }
  if($html.hasClass('is-tab')) {
    ns.isTab = true;
  }
}
