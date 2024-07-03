import Config from "./config.js";
import Nodes from "./nodes.js";
import NamesPanel from "./names-panel.js";

let instance: OptionsPanel;

class OptionsPanel {
  private config = new Config();
  private namesPanel = new NamesPanel();

  constructor() {
    if (instance) return instance;
    instance = this;

    Nodes.optionsBtn.addEventListener("click", () => {
      this.open();
    });

    Nodes.optionsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.save();
      this.namesPanel.init(true);
      this.close();
    });

    Nodes.options_optionCancel.addEventListener("click", () => {
      this.init();
      this.close();
    });
  }

  init() {
    Nodes.options_names.value = this.config.names;
    Nodes.options_removeAfterHit.checked = this.config.removeAfterHit;
    Nodes.options_stopOnDemand.checked = this.config.stopOnDemand;
    Nodes.options_lightTheme.checked = this.config.lightTheme;
    Nodes.options_readOutNames.checked = this.config.readOutNames;
  }

  save() {
    this.config.names = Nodes.options_names.value;
    this.config.removeAfterHit = Nodes.options_removeAfterHit.checked;
    this.config.stopOnDemand = Nodes.options_stopOnDemand.checked;
    this.config.lightTheme = Nodes.options_lightTheme.checked;
    this.config.readOutNames = Nodes.options_readOutNames.checked;
    this.config.save();
  }

  open() {
    Nodes.wrapper.classList.add("flip");
  }

  close() {
    Nodes.wrapper.classList.remove("flip");
  }
}

export default OptionsPanel;
