import $ from 'jquery';
import { TimelineMax, CSSPlugin } from 'gsap/all';
const plugins = [CSSPlugin];
import str2json from '../../utils/str2json';

class Dropdown {
  constructor(el) {
    if (!el) {
      return;
    }
    this.isActive = false;
    this.init(el);
    this.initAnimations();
    this.bindEvents();
  }

  init(el) {
    this.el = el;

    // Cache DOM queries
    this.dropdown = el.querySelector('.Dropdown__contents');

    // Options
    const defaults = {};
    const instanceOptions = str2json(this.el.dataset.options);
    const options = { ...defaults, ...instanceOptions };
  }

  initAnimations() {
    const dropdown = this.dropdown;
    // const options = Array.from(this.dropdown.querySelector('.Nav').children);

    this.tl = new TimelineMax({
      paused: true,
      onComplete: () => {
        this.isActive = true;
      },
      onReverseComplete: () => {
        this.isActive = false;
      }
    });

    this.tl.set(dropdown, {
      display: 'block',
      // x: '-50%',
      immediateRender: false
    });
    this.tl.from(dropdown, 0.15, {
      // y: '20%',
      // height: 0,
      opacity: 0,
      ease: Elastic.easeOut.config(1, 0.75)
    });
    // this.tl.staggerFrom(
    //   options,
    //   0.2,
    //   { y: 8, opacity: 0, ease: Elastic.easeOut.config(1, 0.75) },
    //   0.05,
    //   '-=0.2'
    // );
  }

  bindEvents() {
    this.el.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });
    // this.el.addEventListener('mouseleave', (e) => {
    //   this.close();
    // });

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

export default Dropdown;
