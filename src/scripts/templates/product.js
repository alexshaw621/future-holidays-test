import $ from 'jquery';
import {load} from '@shopify/theme-sections';
import Flickity from 'flickity-imagesloaded';
import {scrollTo} from 'scroll-js';

// import '../sections/product';
import '../sections/product-related-by-name';

const selectors = {
  lifestyleSlider: '[data-lifestyle-slider]',
  reviewsCount: '[data-reviews-count]'
};

const sliderOptions = {
  imagesLoaded: true,
  pageDots: false,
  prevNextButtons: true,
  autoPlay: false,
  contain: true,
};

document.addEventListener('DOMContentLoaded', () => {
  load('*');

  // Lifestyle Slider
  window.theme.lifestyleSlider = new Flickity(selectors.lifestyleSlider, sliderOptions);
  window.theme.lifestyleSlider.resize();

  setTimeout(function() {
    window.theme.lifestyleSlider.element.style.opacity = 1;
  }, 1000);

  // Smooth scroll to review section.
  $(selectors.reviewsCount).on('click', function(e){
    e.preventDefault();
    const id = $(this).attr('href').slice(1);
    const target = document.getElementById(id);

    $('.Accordion__item').removeClass('is-active');
    $('#product__reviews').addClass('is-active');

    // $('.tabs-panel').removeClass('active');
    // $('.tabs-panel--review').addClass('active');
    // $('.tab__link').removeClass('active');
    // $('.tab__link--review').addClass('active');
    scrollTo(window, {behavior: 'smooth', top: target.offsetTop - 50});
  });
});