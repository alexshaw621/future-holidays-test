'use strict';

import $ from 'jquery';
import { TimelineMax } from 'gsap';

const Cookies = require('js-cookie');

class SubscribeModal {
  constructor(el) {
    if (!el) {
      return;
    }
    this.isActive = false;
    this.init(el);
  }

  init(el) {
    this.el = el;
    this.modal = el;
    this.body = document.querySelector('body');
    this.closeBtn = el.querySelector('.js-closeModal');

    // bindAll(this, ['cacheEls', 'bindEvents', 'render', 'openModal', 'closeModal']);

    this.bindEvents();
    this.isOpen = false;
    this.render();
  }

  bindEvents() {
    const self = this;

    if ( this.closeBtn ) {
      this.closeBtn.addEventListener('click', function(e) {
        self.closeModal();
      });
    }

    // Close modal with ESC key
    $(document).keyup( function(e) {
      if ( e.keyCode == 27 && self.isOpen ) {
        // escape key maps to keycode `27`
        self.closeModal();
      }
    });
  }

  render(event, params) {
    const self = this;

    this.tl = new TimelineMax();
    this.tl
        .to( this.modal, 1.0, { y: 0, opacity: 1, zIndex: 85, ease: Power3.easeOut })
        .from( this.modal.querySelector('h4'), 1.0, { y: "60px", opacity: 0, ease: Power3.easeOut })
        .from( this.modal.querySelector('.FormRow'), 1.0, { y: "60px", opacity: 0, ease: Power3.easeOut }, "-=0.25")
        .from( this.modal.querySelector('.SubscribeModal__backdrop'), 1.0, { top: '2rem', opacity: 0, ease: Power3.easeOut }, "-=0.75")
        .from( this.modal.querySelector('.icon-close'), 1.0, { opacity: 0, ease: Power3.easeOut }, "1")
    this.tl.pause();

    // If first time visitor show the newsletter modal
    if ( !Cookies.get('recurrentVisit') ) {
      Cookies.set('recurrentVisit', true, { expires: 1 });
      // Check for screen size
      const w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
      if ( x > 770 ) {
        self.openModal();
      }
    }
  }

  openModal() {

    const self = this;

    this.tl.timeScale(1);
    this.tl.play();
    // self.el.classList.add('is-open');
    // document.querySelector('body').classList.add('has-modalOpen');
    this.isOpen = true;
  }

  closeModal() {
    const self = this;

    if (!this.isOpen) {
        return;
    }
    this.tl.timeScale(2);
    this.tl.reverse();
    // this.body.classList.remove('has-drawerOpen');
    this.isOpen = false;
  }
}

module.exports = SubscribeModal;