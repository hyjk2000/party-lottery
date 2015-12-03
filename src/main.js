/*global NamesPanel OptionsPanel*/

require('../sass/main.scss');
import Config from './config.js';
import NamesPanel from './names-panel.js';
import OptionsPanel from './options-panel.js';

new NamesPanel().init();
new OptionsPanel().init();
