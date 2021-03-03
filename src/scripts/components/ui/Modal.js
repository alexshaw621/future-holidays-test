import $ from 'jquery';
import { TimelineMax } from 'gsap/all';
const delegate = require('delegate');
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
//without this line, CSSPlugin and AttrPlugin may get dropped by your bundler...
// const plugins = [CSSPlugin];

class Modal {
  constructor(el) {
    if (!el) {
      return;
    }
    this.isActive = false;
    this.init(el);
  }

  init(el) {
    this.el = el;
    this.body = document.querySelector('body');
    this.modalBox = el.querySelector('.Modal__box');
    this.modalChildren = this.modalBox.children;
    this.backdrop = el.querySelector('.backdrop');
    this.closeBtn = el.querySelector('.closemodal');
    this.initAnimations();
    this.bindEvents();
  }

  initAnimations(el) {
    const body = this.body;
    const wrapper = this.el;
    const modalChildren = this.modalChildren;
    const modalShade = this.backdrop;
    const modal = this.modalBox;

    this.tl = new TimelineMax({
      // onStart: () => {
      //   console.log(wrapper);
      //   console.log('timeline started');
      // },
      onComplete: () => {
        body.classList.add('has-modalOpen');
        this.isActive = true;
        const isActive = new CustomEvent('isActive');
        this.el.dispatchEvent(isActive);
      },
      onReverseComplete: () => {
        this.isActive = false;
        body.classList.remove('has-modalOpen');
      }
    });

    this.tl.set(wrapper, { display: 'flex', immediateRender: false });
    this.tl.to(wrapper, 0.1, { display: 'flex' });

    // Shade
    this.tl.from(wrapper, 0.4, { opacity: 0 });
    this.tl.from(modalShade, 0.35, {
      autoAlpha: 0
    });

    this.tl.from(
      modal,
      0.6,
      { y: '10%', autoAlpha: 0, ease: Power4.easeOut },
      '-=0.2'
    );

    this.tl.staggerFrom(
      modalChildren,
      0.4,
      { y: '10%', autoAlpha: 0, ease: Power4.easeOut },
      0.06,
      '-=0.2'
    );

    this.tl.pause();
  }

  bindEvents(el) {
    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => {
        this.close();
      });
    }

    delegate(
      this.el,
      '.closeModal',
      'click',
      (e) => {
        this.close();
      },
      false
    );

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
    this.tl.timeScale(1);
    if (this.isActive) {
      return;
    }
    this.tl.play();
    disableBodyScroll(this.body);
    // Event is dispached by the timeline constructor
  }

  close() {
    this.tl.timeScale(1.6);
    const isInactive = new CustomEvent('isInactive');
    if (!this.isActive) {
      return;
    }
    this.tl.reverse();
    this.el.dispatchEvent(isInactive);
    enableBodyScroll(this.body);
  }
}

module.exports = Modal;
