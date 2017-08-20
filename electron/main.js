'use strict';

const { app, BrowserWindow, powerSaveBlocker } = require('electron');
const path = require('path');
const url = require('url');
let caffeine = null;
let win = null;

app.on('window-all-closed', () => {
	powerSaveBlocker.stop(caffeine);
	app.quit();
});

app.on('ready', () => {
	caffeine = powerSaveBlocker.start('prevent-display-sleep');
	win = new BrowserWindow({ width: 1024, height: 640 });
	win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
	win.on('closed', () => {
		win = null;
	});
});
