// import $ from 'jquery';
import jump from 'jump.js';

/**
 * ----------------------------------------------------------------------------
 * ACCORDION
 * ----------------------------------------------------------------------------
 */

class Accordion {
  constructor(el) {
    this.init(el);
    this.bindEvents();
  }

  init(el) {
    this.el = el;
    // this.$el = $(el);
    this.items = el.querySelectorAll('.Accordion__item');
    this.handleHashUpdate(false);
  }

  bindEvents() {
    this.items.forEach((element) => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleItem(element);
      });
    });

    window.onhashchange = this.handleHashUpdate.bind(this);
  }

  toggleItem(el) {
    if (el.classList.contains('is-active')) {
      el.classList.remove('is-active');
    } else {
      el.classList.add('is-active');
    }
    var optionsArray = Array.prototype.slice.call(this.items);
    var filteredArray = optionsArray.filter((item) => !item.isEqualNode(el));
    filteredArray.forEach((el) => {
      el.classList.remove('is-active');
    });
  }

  handleHashUpdate(autoScroll) {
    if (!window.location.hash) return; // Account for calls without an actual hash change

    const newPanel = this.el.querySelector(
      ':scope > [data-identifier=' + window.location.hash.substring(1) + ']'
    );

    if (newPanel) {
      this.toggleItem(newPanel);

      if (autoScroll) {
        // Scroll tabs into view
        // const panelPos = newPanel.offsetTop - 140;
        jump(newPanel, {
          duration: 600,
          offset: -100,
          a11y: false
        });
        // setTimeout(() => {
        //   window.scrollTo({
        //     top: panelPos,
        //     behavior: 'smooth' // Optional, adds animation
        //   });
        // }, 200);
      }
    }
  }
}

module.exports = Accordion;
