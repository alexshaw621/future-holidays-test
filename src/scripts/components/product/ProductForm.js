import $ from 'jquery';
import axios from 'axios';
import Variants from '@shopify/theme-variants';
import { imageSize, preload, getSizedImageUrl } from '@shopify/theme-images';
import { formatMoney } from '@shopify/theme-currency';

const selectors = {
  addToCart: '[data-add-to-cart]',
  addToCartText: '[data-add-to-cart-text]',
  comparePrice: '[data-compare-price]',
  comparePriceText: '[data-compare-text]',
  originalSelectorId: '[data-product-select]',
  qtyInputSelector: '.quantity-input-set input',
  priceWrapper: '[data-price-wrapper]',
  productFeaturedImage: '[data-product-featured-image]',
  productJson: '[data-product-json]',
  productPrice: '[data-product-price]',
  productThumbs: '[data-product-single-thumbnail]',
  singleOptionSelector: '[data-single-option-selector]',
  productGallery: '.Product__gallery',
  miniCartToggleIcon: '.MiniCart__toggle .icon'
};

class ProductForm {
  constructor(el) {
    this.init(el);
    this.bindEvents();
  }

  init(el) {
    // Cache DOM Queries
    this.el = el;
    this.$el = $(el);
    this.variantSelector = el.querySelector(selectors.originalSelectorId);
    this.qtySelector = el.querySelector(selectors.qtyInputSelector);
    this.priceWrapper = el.querySelector(selectors.priceWrapper);
    this.productPrice = el.querySelector(selectors.productPrice);
    this.addToCart = el.querySelector(selectors.addToCart);
    this.addToCartText = el.querySelector(selectors.addToCartText);
    this.featuredImage = el.querySelector(selectors.productFeaturedImage);
    this.gallery = el.querySelector(selectors.productGallery);

    // Get Product Data
    this.productData = JSON.parse(el.querySelector(selectors.productJson).text);

    this.currentVariant = this.variantSelector.value;

    // Determine post add to cart action
    this.successAction = this.addToCart.dataset.action;

    const options = {
      $container: this.$el,
      enableHistoryState: el.dataset.enableHistoryState || false,
      singleOptionSelector: selectors.singleOptionSelector,
      originalSelectorId: selectors.originalSelectorId,
      product: this.productData
    };

    this.settings = {};
    this.variants = new Variants(options);
  }

  bindEvents() {
    this.addToCart.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      this.addProductToCart(ev);
    });
    // this.el.addEventListener('submit', this.addProductToCart.bind(this));

    // When variant is changed
    this.$el.on('variantChange', (ev) => {
      this.updateAddToCartState(ev);
      this.updateGallery(ev);
    });

    // When variant is changed
    this.$el.on('variantPriceChange', (ev) => {
      this.updateProductPrices(ev);
    });
  }

  /**
   * Updates the DOM state of the add to cart button
   *
   * @param {boolean} enabled - Decides whether cart is enabled or disabled
   * @param {string} text - Updates the text notification content of the cart
   */
  updateAddToCartState(evt) {
    const variant = evt.variant;

    // console.log('New Variant: ', variant);
    this.currentVariant = variant.id;

    if (variant) {
      this.priceWrapper.classList.remove('hide');
    } else {
      this.addToCart.disabled = true;
      this.addToCartText.innerHTML = theme.strings.unavailable;
      this.priceWrapper.classList.add('hide');
      return;
    }

    if (variant.available) {
      this.addToCart.disabled = false;
      this.addToCartText.innerHTML = theme.strings.addToCart;
    } else {
      this.addToCart.disabled = true;
      this.addToCartText.innerHTML = theme.strings.soldOut;
    }
  }

  /**
   * Updates the DOM with specified prices
   *
   * @param {string} productPrice - The current price of the product
   * @param {string} comparePrice - The original price of the product
   */
  updateProductPrices(evt) {
    const variant = evt.variant;
    const $comparePrice = $(selectors.comparePrice, this.$el);
    const $compareEls = $comparePrice.add(selectors.comparePriceText, this.$container);

    this.productPrice.innerHTML = formatMoney(variant.price, theme.moneyFormat);

    if (variant.compare_at_price > variant.price) {
      $comparePrice.html(formatMoney(variant.compare_at_price, theme.moneyFormat));
      $compareEls.removeClass('hide');
    } else {
      $comparePrice.html('');
      $compareEls.addClass('hide');
    }
  }

  updateGallery(evt) {
    const variant = evt.variant;
    if (variant && this.gallery) {
      const variantUpdated = new CustomEvent('variant-updated', {
        detail: {
          variant: variant
        }
      });
      this.gallery.dispatchEvent(variantUpdated);
    }
  }

  addProductToCart(ev) {
    ev.preventDefault();

    const addingToCart = new CustomEvent('cart.productAdding');
    document.body.dispatchEvent(addingToCart);
    console.log('Dispatch cart.productAdding event');

    axios
      .post('/cart/add.js', {
        quantity: this.el.querySelector(selectors.qtyInputSelector) ? this.el.querySelector(selectors.qtyInputSelector).value : 1,
        id: this.currentVariant
      })
      .then((response) => {
        const productAddedToCart = new CustomEvent('cart.productAdded', {
          detail: response.data
        });
        document.body.dispatchEvent(productAddedToCart);
        // console.log('Dispatch cart.productAdded event');
        // console.log('Product added', response.data);
        // Redirect to checkout depending on element dataset properties
        if (this.successAction && this.successAction == 'redirect') {
          window.location.replace(window.location.origin + '/checkout');
        }

        // @Request: Enable Flash cart.
        $('html, body').animate({ scrollTop: 0 }, 500);
        $(selectors.miniCartToggleIcon).css({ animationIterationCount: 'infinite' });
        $(selectors.miniCartToggleIcon).addClass('bounce animated');

        // ABTest - Flash Cart
        // dataLayer.push({'event': 'optimize.activateFlashCart'});
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default ProductForm;
