'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
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
        loader: 'file-loader?publicPath=./&name=[name]-[sha512:hash:base64:7].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
      disable: false
    })
  ]
};
