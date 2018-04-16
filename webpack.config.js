'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          'html-loader',
          {
            loader: 'ejs-html-loader',
            options: {
              production: process.env.NODE_ENV === 'production',
              electron: process.env.NODE_ENV === 'electron',
              timestamp: new Date().getTime()
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap')
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?[a-z0-9#-]+)?$/,
        loader: 'file-loader?publicPath=./&name=[name].[hash:8].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new HtmlPlugin({
      filename: 'index.html',
      template: './index.html.ejs'
    }),
    new ExtractTextPlugin({
      filename: 'bundle.[hash:8].css'
    }),
    new CopyPlugin([
      { from: 'node_modules/babel-polyfill/dist/polyfill.min.js', to: 'babel-polyfill.min.js' },
      { from: 'apple-touch-icon.png' },
      { from: 'favicon.png' },
      { from: 'manifest.webmanifest' },
      { from: 'LICENSE' }
    ]),
    new SWPrecacheWebpackPlugin({
      cacheId: 'party-lottery',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: '/party-lottery/',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/, /\.appcache$/]
    })
  ]
};
