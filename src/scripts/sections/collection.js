/**
 * Collection Script
 * -----------------------------------------------------------------------------
 *
 * @namespace collection
 */

import $ from 'jquery';
import {register} from '@shopify/theme-sections';
import InfiniteScroll from 'infinite-scroll';

import '../utils/url';

const selectors = {
  collectionLoop: '[data-collection-products]',
  productsCount: '[data-products-count]',
  filterHeader: '[data-filter-header]',
  filterType: '[data-filter-type]',
  filterContentFor: '[data-filter-content-for]',
  filterTag: '[data-filter-tag]',
  filterContentOptions: '[data-filter-content-options]',
  filterTagSelected: '[data-filter-tag-selected]'
}

register('template-collection', {
  onLoad() {
    const self = this;

    // Init InifiniteScroll
    const lazyLoaderElem = document.querySelector(selectors.collectionLoop);
    const nextPageLink = lazyLoaderElem.querySelector('.js-pageNav .nextPageLink');
    if (nextPageLink) {
      window.theme.productsInfiniteLoop = new InfiniteScroll(lazyLoaderElem.querySelector('.Loop--products'), {
        path: '.js-pageNav .nextPageLink',
        append: '.js-lazyload > .Card',
        status: '.page-load-status',
        hideNav: '.js-pageNav'
      });
    }

    $(selectors.filterType).on('click', function() {
      const filterType = $(this).data('filterType');
      $(selectors.filterContentFor).removeClass('active');
      $(`[data-filter-content-for="${filterType}"]`).toggleClass('active');
    });

    $(selectors.filterTag).on('change', function() {
      if ($(this).prop('checked')) {
        const selectedTag = $(this).closest('label').find('.tag').html();
        $(this).closest('.filter__content').find('[data-filter-tag-selected]').html(selectedTag);
        $(this).closest('.filter__content').find('[data-filter-tag-reset]').addClass('active');
      } else {
        $(this).closest('.filter__content').find('[data-filter-tag-reset]').removeClass('active');
      }

      self.filterInit();
    });

    $('body').on('click', '[data-filter-tag-reset] a', function(e) {
      e.preventDefault();
      const selectedOption = $(this).closest(selectors.filterContentFor);
      self.clearSelectedFilter(selectedOption);
    });
  },

  filterInit() {
    let selectedOptions = [],
        query = '',
        currentTags = '',
        url1 = url('1') ? '/' + url('1') + '/' : '',
        url2 = url('2') ? url('2') + '/' : '',
        url3 = url('3'),
        path = url1 + url2;

    //Add all checkbox values to array
    $('[data-option-filter] input:checked').each(function (){
      selectedOptions.push($(this).data('filterTag'));
    });
    selectedOptions = $.makeArray(selectedOptions);

    //Loop through tags to create string to update page url
    $.each(selectedOptions, function(i, value){
      if (i != selectedOptions.length - 1) {
        currentTags += selectedOptions[i] + '+';
      } else {
        currentTags += selectedOptions[i];
      }
    });

    query = '?' + $.param(Shopify.queryParams);
    this.processUrl(path, currentTags, query);
  },
  processUrl: function(path, tags, query){
    var query = query.replace(/\page=(\w+)&/, ''),
        urlString = '';

    urlString = path + tags + query;
    this.updateView(urlString);
  },
  updateView: function(filterURL) {
    $.ajax({
      type: 'GET',
      url: filterURL,
      beforeSend: function() {
        if (typeof theme.productsInfiniteLoop !== 'undefined') {
          window.theme.productsInfiniteLoop.destroy();
        }
        $(selectors.collectionLoop).addClass('loading-in-progress');
      },
      success: function(data) {
        $(selectors.collectionLoop).removeClass('loading-in-progress');

        var filteredData = $(data).find(selectors.collectionLoop);
        var productsCount = $(data).find(".results_count").html();

        $(selectors.collectionLoop).html(filteredData.html());
        $(selectors.productsCount).html(productsCount);
        
        const nextPageLink = document.querySelector('.js-pageNav .nextPageLink');
        if (nextPageLink) {
          window.theme.productsInfiniteLoop = new InfiniteScroll(document.querySelector('.Loop--products'), {
            path: '.js-pageNav .nextPageLink',
            append: '.js-lazyload > .Card',
            status: '.page-load-status',
            hideNav: '.js-pageNav'
          });
        }

        window.history && window.history.pushState && window.history.pushState("", "", filterURL);
      },
      error: function(x, t, m) {
        console.log(x);
        console.log(t);
        console.log(m);
        location.replace(location.protocol + '//' + location.host + filterURL);

      },
      dataType: "html"
    });
  },
  clearSelectedFilter: function(optionFilter){
    optionFilter.find('[data-option-filter] input:checked').prop('checked', false).trigger('change');
  }
});
