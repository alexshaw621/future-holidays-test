const InfiniteScroll = require('infinite-scroll');
import AppComponents from '../AppComponents';

class LazyLoader {
  constructor(el) {
    // console.log('Hello from the lazyloader');
    this.init(el);
    this.loader = null;
  }

  init(el) {
    this.el = el;

    const nextPageLink = el.querySelector('.js-pageNav .nextPageLink');
    // return;
    if (!nextPageLink) {
      return;
    }

    this.loader = new InfiniteScroll(el.querySelector('.Loop'), {
      path: '.js-pageNav .nextPageLink',
      append: '.js-lazyload > .Card',
      status: '.page-load-status',
      hideNav: '.js-pageNav'
    });

    this.loader.on('append', (response, path, items) => {
      items.forEach((element) => {
        const components = element.querySelectorAll('[data-component]');
        this.initComponents(components);
      });
    });
  }

  initComponents(elements) {
    window.theme.Components = window.theme.Components || [];
    elements.forEach((el) => {
      const modules = el.dataset.component.split(',');
      modules.forEach((componentConstructor) => {
        new AppComponents(componentConstructor, el);
      });
    });
  }

  destroy() {
    this.loader.destroy();
  }
}

export default LazyLoader;
