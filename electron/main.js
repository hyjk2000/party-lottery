'use strict';

let app = require('app');
let BrowserWindow = require('browser-window');
let powerSaveBlocker = require('power-save-blocker');
let caffeine = null;
let mainWindow = null;

app.on('window-all-closed', function() {
	powerSaveBlocker.stop(caffeine);
	app.quit();
});

app.on('ready', function() {
	caffeine = powerSaveBlocker.start('prevent-display-sleep');
	mainWindow = new BrowserWindow({ width: 1024, height: 640 });
	mainWindow.loadUrl(`file://${__dirname}/index.html`);
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});
