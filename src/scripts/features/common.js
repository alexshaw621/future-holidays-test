import { isFunction } from 'lodash-es';
import str2json from '../utils/str2json';
import AppComponents from '../components/AppComponents';
import AOS from 'aos';

const delegate = require('delegate');

// Delegate click event for elements that interact with theme components
delegate(
  document.body,
  '[data-action]',
  'click',
  (e) => {
    const options = str2json(e.delegateTarget.dataset.action);
    const params = options.details || null;
    if (
      isFunction(
        window.theme.Components[options.type][options.target][options.action]
      )
    ) {
      window.theme.Components[options.type][options.target][options.action](
        params
      );
    }
  },
  false
);

// Make the entire block clickable
delegate(
  document.body,
  '.js-clickBlock',
  'click',
  (e) => {
    // If already a link bailout
    if (e.target.tagName == 'A' || e.target.tagName == 'BUTTON') {
      return;
    }

    const link = e.delegateTarget.querySelector('a');
    if (link && link.href) {
      e.preventDefault();
      window.location.href = link.href;
    }
  },
  false
);

const init = (elements) => {
  window.theme.Components = window.theme.Components || [];

  elements.forEach((el) => {
    const modules = el.dataset.component.split(',');
    modules.forEach((componentConstructor) => {
      new AppComponents(componentConstructor, el);
    });
  });
};

// On the first load we load every component
init(document.querySelectorAll('[data-component]'));

// Generate the SVG Sprites
const files = require.context(
  '!svg-sprite-loader!../../icons/svg/',
  false,
  /.*\.svg$/
);
files.keys().forEach(files);

// Init AOS animations
AOS.init({
  anchorPlacement: 'center-bottom'
});
