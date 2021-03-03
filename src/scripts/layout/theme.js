import '../polyfills/nodelistForEach';
import '../polyfills/objectAssign';
import '../polyfills/customEvent';
import '../polyfills/modernizr-custom';

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

// Expose jQuery to third party plugins
// import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;

import {focusHash, bindInPageLinks} from '@shopify/theme-a11y';
import {cookiesEnabled} from '@shopify/theme-cart';

import '../features/common';
import '../features/webfonts';
import '../features/googleOptimize';

window.theme = window.theme || {};

// Expose jQuery to third party plugins
window.jQuery = $;
window.$ = $;

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (cookiesEnabled()) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}
