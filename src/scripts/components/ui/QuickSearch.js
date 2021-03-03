import { TweenLite, TimelineMax } from 'gsap/all';

class QuickSearch {
  constructor(el) {
    this.el = el;
    this.input = el.querySelector('input');
    this.button = el.querySelector('button');
    this.active = false;
    this.initAnimations();
    this.bindEvents();
  }

  initAnimations() {
    const drawer = this.el;
    const input = this.input;

    this.tl = new TimelineMax({
      onComplete: () => {
        input.focus();
      }
    });
    this.tl.set(drawer, {
      height: 'auto',
      display: 'flex',
      immediateRender: false
    });
    this.tl.from(drawer, 0.3, { height: 0, ease: Power4.easeOut });

    this.tl.pause();
  }

  bindEvents() {
    this.input.addEventListener('input', (e) => {
      if (e.target.value.length > 3) {
        TweenLite.to(this.button, 0.3, {
          opacity: 1,
          y: '-50%',
          ease: Power4.easeInOut
        });
      } else {
        TweenLite.to(this.button, 0.3, {
          opacity: 0,
          y: '10%',
          ease: Power4.easeInOut
        });
      }
    });
  }

  toggle() {
    if (this.active) {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    if (this.active) {
      return;
    }
    this.tl.play();
    this.active = true;
  }
  close() {
    if (!this.active) {
      return;
    }
    this.tl.reverse();
    this.active = false;
  }
}

export default QuickSearch;
