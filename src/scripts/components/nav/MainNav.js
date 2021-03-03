import { each } from 'lodash-es';
import { TweenMax, CSSPlugin } from 'gsap';
const hoverintent = require('hoverintent');

class TopMenuItem {
  constructor(el) {
    this.el = el;
    this.submenu = el.querySelector(':scope > .Nav__submenu');
    this.infoWrapper = el.querySelector('.Nav__info');
    this.infoContent = el.querySelector('.Nav__info .wrapper');
    this.subOptions = el.querySelectorAll('.Nav__item');

    if (this.submenu) {
      // this.setInitialValues();
      this.bindEvents();
    }
  }

  bindEvents() {
    let intentOptions = {
      timeout: 250,
      interval: 100
    };

    hoverintent(this.el, this.open.bind(this), this.close.bind(this)).options(
      intentOptions
    );

    each(this.subOptions, (el) => {
      el.addEventListener('mouseenter', (ev) => {
        this.swapInfo(ev.target);
      });
    });
  }

  setInitialValues() {
    this.menuSizing = this.submenu.getBoundingClientRect();
  }

  setCoordinates() {
    let coordinates = this.el.getBoundingClientRect();
  }

  positionMenu() {
    const coords = this.submenu.getBoundingClientRect();
    if (coords.x < 140) {
      this.alignment = 'left';
    } else {
      this.alignment = 'center';
    }
  }

  open() {
    TweenMax.set(this.submenu, { clearProps: 'all' });
    TweenMax.set(this.submenu, { display: 'flex' });
    this.positionMenu();

    if (this.alignment == 'left') {
      // console.log('menu is left aligned');
      this.submenu.classList.add('is-leftAligned');
      TweenMax.set(this.submenu, { x: 0, left: 0 });
      TweenMax.from(this.submenu, 0.8, {
        y: '40px',
        opacity: 0,
        ease: Expo.easeOut
      });
    } else {
      // console.log('menu is center aligned');
      this.submenu.classList.remove('is-leftAligned');
      TweenMax.set(this.submenu, { left: '50%', x: '-50%' });
      TweenMax.from(this.submenu, 0.8, {
        y: '40px',
        opacity: 0,
        ease: Expo.easeOut
      });
    }
    this.setInitialValues();
  }

  close() {
    // console.log('close the submenu');
    TweenMax.set(this.submenu, { display: 'none' });
  }

  swapInfo(newOption) {
    let targetInfo = newOption.querySelector('.details-info');
    if (targetInfo) {
      this.expandSubMenu(targetInfo.innerHTML);
    } else {
      this.collapseSubMenu();
    }
  }

  expandSubMenu(newInfo) {
    TweenMax.to(this.infoWrapper, 0.5, {
      left: '100%',
      autoAlpha: 1,
      ease: Expo.easeOut
    });
    TweenMax.to(this.infoContent, 0.6, { opacity: 0 });
    TweenMax.to(this.submenu, 0.4, {
      height: this.menuSizing.height,
      ease: Expo.easeOut
    });
    this.infoContent.innerHTML = newInfo;
    TweenMax.to(this.submenu, 0.4, {
      height: Math.max(
        this.infoContent.getBoundingClientRect().height,
        this.menuSizing.height
      ),
      ease: Expo.easeOut
    });
    TweenMax.to(this.infoContent, 0.6, { opacity: 1 });
  }

  collapseSubMenu() {
    TweenMax.to(this.infoWrapper, 0.5, {
      left: '0%',
      autoAlpha: 0,
      ease: Expo.easeOut
    });
  }
}

class MainNav {
  constructor(el) {
    this.el = el;
    this.menuItems = el.querySelectorAll('.Nav__item--main');
    this.init();
  }

  init() {
    each(this.menuItems, (el) => {
      new TopMenuItem(el);
    });
  }
}

export default MainNav;
