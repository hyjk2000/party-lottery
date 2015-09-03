let OptionsPanel = (function() {
  let instance = null;

  class OptionsPanel {
    constructor(nodes) {
      if (instance) return instance;
      instance = this;

      this.config = new Config();
      this.namesPanel = new NamesPanel();

      nodes.optionsBtn.addEventListener('click', e => {
        this.open();
      });

      nodes.optionsForm.addEventListener('submit', e => {
        this.save();
        this.namesPanel.init(true);
        this.close();
      });

      nodes.options_optionCancel.addEventListener('click', e => {
        this.init();
        this.close();
      });

      nodes.options_checkboxes.forEach(aChkbox => {
        aChkbox.addEventListener('click', function(e) {
          let realChkbox = this.querySelector('input[type=checkbox]');
          realChkbox.checked = !realChkbox.checked;
          realChkbox.checked ? this.classList.add('on') : this.classList.remove('on');
        }, false);
      });
    }

    init() {
      nodes.options_names.value = this.config.names;
      nodes.options_removeAfterHit.checked = this.config.removeAfterHit;
      nodes.options_stopOnDemand.checked = this.config.stopOnDemand;
      nodes.options_lightTheme.checked = this.config.lightTheme;
      nodes.options_readOutNames.checked = this.config.readOutNames;
      nodes.options_checkboxes.forEach(aChkbox => {        
        let realChkbox = aChkbox.querySelector('input[type=checkbox]');
        realChkbox.checked ? aChkbox.classList.add('on') : aChkbox.classList.remove('on');
      });
    }

    save() {
       this.config.names = nodes.options_names.value;
       this.config.removeAfterHit = nodes.options_removeAfterHit.checked;
       this.config.stopOnDemand = nodes.options_stopOnDemand.checked;
       this.config.lightTheme = nodes.options_lightTheme.checked;
       this.config.readOutNames = nodes.options_readOutNames.checked;
       this.config.save();
    }

    open() {
      nodes.wrapper.classList.add('flip');
    }

    close() {
      nodes.wrapper.classList.remove('flip');
    }
  }

  return OptionsPanel;
})();
