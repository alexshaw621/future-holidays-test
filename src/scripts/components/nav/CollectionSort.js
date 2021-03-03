import $ from 'jquery';

class CollectionSort {
  constructor(el) {
    this.bindEvents();
  }

  bindEvents() {
    Shopify.queryParams = {};
    if (location.search.length) {
      for (
        var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&');
        i < aCouples.length;
        i++
      ) {
        aKeyValue = aCouples[i].split('=');
        if (aKeyValue.length > 1) {
          Shopify.queryParams[
            decodeURIComponent(aKeyValue[0])
          ] = decodeURIComponent(aKeyValue[1]);
        }
      }
    }
    $('.js-sortBy a').bind('click', function() {
      Shopify.queryParams.sort_by = $(this).data('value');
      location.search = $.param(Shopify.queryParams).replace(/\+/g, '%20');
    });
  }
}

export default CollectionSort;
