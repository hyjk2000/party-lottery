var app = require('app');
var BrowserWindow = require('browser-window');
var powerSaveBlocker = require('power-save-blocker');
var caffeine = null;
var mainWindow = null;

app.on('window-all-closed', function() {
	powerSaveBlocker.stop(caffeine);
	app.quit();
});

app.on('ready', function() {
	caffeine = powerSaveBlocker.start('prevent-display-sleep');
	mainWindow = new BrowserWindow({ width: 1024, height: 640 });
	mainWindow.loadUrl('file://' + __dirname + '/index.html');
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});
