/**
 * ----------------------------------------------------------------------------
 * ACCORDION
 * This component is associated with UIKIT nav component, adding mouseover
 * accordion expansion to the main options.
 * ----------------------------------------------------------------------------
 */

const delegate = require('delegate');
import getClosest from '../../utils/getClosest';

class Accordion {
  constructor(el) {
    this.init(el);
  }

  init(el) {
    this.el = el;
    this.mainOptions = el.querySelectorAll('.has-submenu');
    this.endOptions = el.querySelectorAll('.Nav__item:not(.has-submenu) a');

    delegate(
      this.el,
      '.Nav__item--main.has-submenu > a',
      'click',
      (e) => {
        e.preventDefault();
        this.toggleItem(e.delegateTarget);
      },
      false
    );
  }

  toggleItem(target) {
    const parentNode = getClosest(target, '.Nav__item');

    if (!parentNode) return;

    // If item already active, follow the link
    if (parentNode.classList.contains('is-active')) {
      parentNode.classList.remove('is-active');
      if (target.href) {
        window.location = target.href;
      }
    } else {
      parentNode.classList.add('is-active');
      var optionsArray = Array.prototype.slice.call(this.mainOptions);
      var filteredArray = optionsArray.filter(
        (item) => !item.isEqualNode(parentNode)
      );

      filteredArray.forEach((el) => {
        el.classList.remove('is-active');
      });
    }
  }

  handleMobileTap() {
    theme.Components.Drawer.mainNav.close();
  }
}

module.exports = Accordion;
