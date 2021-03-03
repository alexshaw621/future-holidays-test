'use strict';

import { bindAll } from 'lodash';
const Instafeed = require('instafeed.js');

class InstagramFeed {
  constructor(el) {
    this.init(el);
  }
  init(el) {
    let feed = new Instafeed({
      // get: 'tagged',
      get: 'user',
      // tagName: 'grubstick',
      userId: '1956535021',
      accessToken: '1956535021.1677ed0.f96d91f1c88443b4b0d542631e180c95',
      // clientId: '430fcda7841a416da9079056c017306c',
      resolution: 'standard_resolution',
      limit: 4,
      template:
        '<figure class="Tile__box"><a href="{{link}}"><img data-src="{{image}}" class="lazyload blur-up" /><svg viewBox="0 0 20 20" class="icon" width="1em" height="1em"><use xlink:href="#icon-instagram"></use></svg></a></figure>'
      // after: function() {
      //     jQuery('.Section__content .SubscribeNews').insertAfter( jQuery('.InstagramGallery').children().eq(7) );
      // }
    });
    feed.run();
  }
}

export default InstagramFeed;
