require('../sass/main.scss');
import 'babel-polyfill';
import NamesPanel from './names-panel.js';
import OptionsPanel from './options-panel.js';

new NamesPanel().init();
new OptionsPanel().init();
