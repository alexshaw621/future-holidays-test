import { TweenMax } from 'gsap/all';

class CartButton {
  constructor(el) {
    // this.bindEvents();
    this.loading = false;
    this.init(el);
  }
  init(el) {
    this.el = el;
    this.buttonText = el.querySelector('[data-add-to-cart-text]');

    el.addEventListener('click', (e) => {
      this.initStateAnimation();
      // body
    });

    document.body.addEventListener('cart.productAdded', (ev) => {
      if (this.loading) {
        this.buttonActionCompleted(ev);
      }
    });
  }

  initStateAnimation() {
    this.loading = true;
    this.el.classList.add('is-loading');
    // When adding items to cart, open the minicart
  }

  buttonActionCompleted(event, cart) {
    this.el.classList.remove('is-loading');
    this.el.classList.add('is-done');

    TweenMax.to(this.buttonText, 0.6, { opacity: 0, ease: Power4.easeOut });
    this.buttonText.innerHTML = 'Product Added';

    TweenMax.to(this.buttonText, 0.6, { opacity: 1, ease: Power4.easeOut });

    setTimeout(() => {
      TweenMax.to(this.buttonText, 0.6, { opacity: 0, ease: Power4.easeOut });
      this.buttonText.innerHTML = theme.strings.addToCart;
      TweenMax.to(this.buttonText, 0.6, { opacity: 1, ease: Power4.easeOut });
    }, 2000);
  }
}

export default CartButton;
