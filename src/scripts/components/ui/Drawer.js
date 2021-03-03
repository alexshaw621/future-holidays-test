import $ from 'jquery';
import { TimelineMax } from 'gsap/all';

import str2json from '../../utils/str2json';

class Drawer {
  constructor(el) {
    if (!el) {
      return;
    }
    this.isActive = false;
    this.init(el);
    this.initAnimations();
    this.bindEvents();
    this.initialized = true;
  }

  init(el) {
    this.el = el;
    // cache elements
    this.body = document.querySelector('body');
    this.drawer = el;
    this.drawerBox = el.querySelector('.Drawer__box');
    this.backdrop = el.querySelector('.backdrop');
    this.closeDrawer = el.querySelector('.btn-close-drawer');

    const defaults = {
      position: 'left'
    };

    const instanceOptions = str2json(this.el.dataset.options);
    const options = { ...defaults, ...instanceOptions };
  }

  initAnimations() {
    const body = document.body;
    const wrapper = this.el;
    const backdrop = this.backdrop;
    const drawer = this.drawerBox;
    // const drawerSections = Array.from(this.drawerBox.children);

    this.tl = new TimelineMax({
      // onStart: () => {
      //   //   console.log(wrapper);
      // },
      paused: true,
      onComplete: () => {
        body.classList.add('has-modalOpen');
        this.isActive = true;
      },
      onReverseComplete: () => {
        this.isActive = false;
        body.classList.remove('has-modalOpen');
      }
    });

    this.tl.set(wrapper, { display: 'flex', immediateRender: false });

    // Shade
    this.tl.from(wrapper, 0.4, { opacity: 0 });
    this.tl.from(backdrop, 0.35, {
      autoAlpha: 0
    });

    // this.tl.set(drawer, { autoAlpha: 0, immediateRender: false });
    this.tl.to(
      drawer,
      0.5,
      {
        x: '0%',
        autoAlpha: 1,
        ease: Expo.easeOut
      },
      '-=0.4'
    );
  }

  bindEvents() {
    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => {
        this.close();
      });
    }

    if (this.closeDrawer) {
      this.closeDrawer.addEventListener('click', (e) => {
        this.close();
      });
    }

    // Close modal with ESC key
    $(document).keyup((e) => {
      if (e.keyCode == 27 && this.isActive) {
        // escape key maps to keycode `27`
        this.close();
      }
    });
  }

  toggle() {
    // Bailout if toggle component is disabled
    if (this.disabled) {
      return;
    }
    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    const isActive = new CustomEvent('isActive');
    if (this.isActive) {
      return;
    }
    this.tl.play();
    this.el.dispatchEvent(isActive);
  }

  close() {
    const isInactive = new CustomEvent('isInactive');
    if (!this.isActive) {
      return;
    }
    this.tl.reverse();
    this.el.dispatchEvent(isInactive);
  }
}

module.exports = Drawer;
