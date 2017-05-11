# [Party Lottery](https://hyjk2000.github.io/party-lottery/)

[![Build Status](https://travis-ci.org/hyjk2000/party-lottery.svg?branch=master)](https://travis-ci.org/hyjk2000/party-lottery) [![Code Climate](https://codeclimate.com/github/hyjk2000/party-lottery/badges/gpa.svg)](https://codeclimate.com/github/hyjk2000/party-lottery) [![Dev Dependency Status](https://david-dm.org/hyjk2000/party-lottery/dev-status.svg)](https://david-dm.org/hyjk2000/party-lottery?type=dev) [![Github All Releases](https://img.shields.io/github/downloads/hyjk2000/party-lottery/total.svg)](https://github.com/hyjk2000/party-lottery/releases)

A lottery game app for parties, weddings, team buildings, etc.

[<img width="" alt="available-in-the-chrome-web-store" src="https://cloud.githubusercontent.com/assets/4647136/25934360/ed9989b2-364f-11e7-8576-8a7e1cf53a26.png">](https://chrome.google.com/webstore/detail/cmdnpelgmfofpdiioompgofknddfhphc)

[Legacy version](https://partylottery.sinaapp.com) with IE8 support.

Created by [James Shih](https://hyjk2000.github.io).

## How to use

```shell
$ git clone https://github.com/hyjk2000/party-lottery.git
$ cd party-lottery
$ npm install

$ npm start                 # Start development server
$ npm run eslint            # Lint the code
$ npm run build             # Build the assets
$ npm run pack              # Build Electron app

$ pm2 start processes.json  # Start production server
```

## Origin

This was a toy app for use in my wedding back in 2013. I could not find a suitable and good-looking lottery app so I wrote one in a couple of hours. Some friends of mine showed interest in it. Since then I added a configuration panel and several other features to make it a real app.

## Plan

Years later I found this app is still pretty useful. But the code was written in a rush and is too messy to work on.

- [x] Rewrite JavaScript in ECMAScript 2015
- [x] Rewrite CSS using Sass and Autoprefixer
- [x] Remove jQuery & Modernizr (along with ancient browsers support)
- [x] Package with [Electron](http://electron.atom.io/)

## Contribute

Pull requests, feature requests and bug reports are welcome.

## Copyright / License

Copyright 2013-2015 James Shih.

This software is licensed under the [MIT License](https://github.com/hyjk2000/party-lottery/blob/master/LICENSE).

[IcoMoon](https://icomoon.io) - Copyright 2015 Roonas. Licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/).
