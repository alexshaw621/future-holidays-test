import {load} from '@shopify/theme-sections';
import InfiniteScroll from 'infinite-scroll';

const selectors = {
  searchLoop: '[data-search-results]',
}

document.addEventListener('DOMContentLoaded', () => {
  load('*');

  // Init InifiniteScroll
  const lazyLoaderElem = document.querySelector(selectors.searchLoop);
  const nextPageLink = lazyLoaderElem.querySelector('.js-pageNav .nextPageLink');
  if (nextPageLink) {
    window.theme.searchResultsLoop = new InfiniteScroll(lazyLoaderElem.querySelector('.Loop'), {
      path: '.js-pageNav .nextPageLink',
      append: '.js-lazyload > .Card',
      status: '.page-load-status',
      hideNav: '.js-pageNav'
    });
  }
});