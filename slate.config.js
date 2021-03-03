/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');

module.exports = {
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.extend': {
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        assets: path.resolve('./src/assets/'),
        images: path.resolve('./src/assets/img'),
        jquery: path.resolve('./node_modules/jquery'),
        'lodash-es': path.resolve('./node_modules/lodash-es'),
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx/,
          loader: 'babel-loader',
        },
        {
          test: /\.svg$/,
          loader:
            'svg-sprite-loader?' +
            JSON.stringify({
              name: '[name]',
            }),
        },
      ],
    },
  },
};
