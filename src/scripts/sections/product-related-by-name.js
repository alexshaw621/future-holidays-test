/**
 * Products related by name Script
 * ------------------------------------------------------------------------------
 *
 * @namespace product-related-by-name
 */

import {register} from '@shopify/theme-sections';
import Flickity from 'flickity';
import getHTML from '../components/utils/getHtml';

const selectors = {
  relatedProductsbyCollection: '[data-related-products-by-collection]',
  relatedSection: '[data-related-products-by-name]',
  relatedSectionContent: '[data-related-section-content]',
  relatedSectionCard: 'Card'
};

const sliderOptions = {
  autoPlay: false,
  prevNextButtons: false,
  pageDots: false,
  contain: true,
};

const classes = {
  hide: 'u-none'
};

register('section-product-related-by-name', {
  onLoad() {
    const relatedProductsbyName = document.querySelector(selectors.relatedSection);

    this.getSearchResults(
      relatedProductsbyName.dataset.productRelatedKey,
    );
  },

  onUnload() {
  },

  getSearchResults(key) {
    const searchUrl = `/search?view=data&type=product&q=${key}`;
    getHTML( searchUrl, function (response) {
      const relatedProductsbyName = document.querySelector(selectors.relatedSection);
      const relatedSectionContent = document.querySelector(selectors.relatedSectionContent);
      relatedSectionContent.innerHTML = response.documentElement.innerHTML;

      const relatedSectionCard = relatedSectionContent.getElementsByClassName(selectors.relatedSectionCard);
      const relatedProductsbyCollection = document.querySelector(selectors.relatedProductsbyCollection);

      // Remove main product If search result contains it.
      const mainProductHandle = document.querySelector('.Product').dataset.productHandle;
      document.querySelector('[data-card-handle="' + mainProductHandle + '"]').remove();

      if (relatedSectionCard.length > 1) {
        relatedProductsbyCollection.classList.add(classes.hide);
        relatedProductsbyName.classList.remove(classes.hide);
      } else {
        // If no related products by name, then show related products by collection.
        relatedProductsbyCollection.classList.remove(classes.hide);
        relatedProductsbyName.classList.add(classes.hide);
      }

      if (relatedSectionCard.length > 2) { // Enable slider when it has more than 2 items (It includes main product)
        window.theme.relatedProductsSlider = new Flickity(relatedSectionContent, sliderOptions);
        setTimeout(function() {
          window.theme.relatedProductsSlider.resize();
        }, 1500);
      }
      // $(window).on('load', () => { window.theme.relatedProductsSlider.resize(); });
    });
  },
});