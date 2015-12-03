'use strict';

let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [`${__dirname}/src/main.js`],
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/dist/',
    filename: 'all.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!autoprefixer!sass?sourceMap')
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?[a-z0-9#-]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('all.css', {
      allChunks: true
    })
  ]
};
