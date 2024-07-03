import NamesPanel from "./names-panel.ts";
import Nodes from "./nodes.ts";
import OptionsPanel from "./options-panel.ts";
import { initPWA } from "./pwa.ts";
import "./scss/main.scss";

new NamesPanel().init();
new OptionsPanel().init();

initPWA(Nodes.wrapper);
