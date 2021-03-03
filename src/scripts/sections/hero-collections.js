/**
 * Hero Collection Script
 * -----------------------------------------------------------------------------
 * Optionally applies carousel plugin.
 *
 * @namespace hero-collection
 */

import $ from 'jquery';
import {register} from '@shopify/theme-sections';
import Flickity from 'flickity';
import 'jquery-match-height';

const selectors = {
  heroSlider: '[data-hero-slider]',
};

const sliderOptions = {
  prevNextButtons: true,
  pageDots: false,
  wrapAround: true,
};


register('hero-collections', {
  onLoad() {
    window.theme.heroSliders = [];
    for(let i=0; i<= $(selectors.heroSlider).length; i++) {
      if (matchMedia('screen and (max-width: 1023px)').matches) {
        window.theme.heroSliders.push(new Flickity($(selectors.heroSlider)[i], sliderOptions));
      } else {
        if ($($(selectors.heroSlider)[i]).find('.Card').length > 3){
          window.theme.heroSliders.push(new Flickity($(selectors.heroSlider)[i], sliderOptions));
        }
      }
      // window.theme.heroSlider[i].resize();
    }

    $(window).on('load', () => {
      $.each(window.theme.heroSliders, function(){
        this.resize();
      });
    });
  },
});
