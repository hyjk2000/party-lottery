#!/usr/local/bin/node
/*eslint no-console:0*/

'use strict';

let http = require('http');
let nodeStatic = require('node-static');
let fileServer = new nodeStatic.Server('.', { gzip: true });
let webpack = require('webpack');
let webpackConfig = require('../webpack.config.js');

// Webpack

let compiler = webpack(webpackConfig);

let compilerCallback = (err, stats) => {
  if (err) return console.error(err);
  let jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) console.error(jsonStats.errors);
  if (jsonStats.warnings.length > 0) console.warn(jsonStats.warnings);
}

if (process.env.NODE_ENV == 'production') {
  compiler.run(compilerCallback);
} else {
  compiler.watch({
      aggregateTimeout: 300,
      poll: false
  }, compilerCallback);
}

// Server

http.createServer((req, res) => {
    req.addListener('end', () => {
        fileServer.serve(req, res, (error, result) => {
          if (error) {
              res.writeHead(error.status, error.headers);
              res.end();
          }
        });
    }).resume();
}).listen(8080);

console.log('Server started on http://localhost:8080/ ...');
