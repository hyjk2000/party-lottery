let nodes = (function() {
  let $ = (selector) => {
    return document.querySelector(selector);
  }

  let $$ = (selector) => {
    return [].slice.call(document.querySelectorAll(selector));
  };

  return {
    wrapper: $('#wrapper'),
    namesPanel: $('#namesPanel'),
    nameNodes: () => $$('.name'),
    nameNodesLeft: () => $$('.name:not(.on):not(.disabled)'),
    nameOnNode: () => $('.name.on'),
    resetBtn: $('#reset-btn'),
    clickArea: $('#click-area'),
    optionsBtn: $('#options-btn'),
    optionsPanel: $('#optionsPanel'),
    optionsForm: $('#options-form'),
    options_names: $('#names'),
    options_removeAfterHit: $('#removeAfterHit'),
    options_stopOnDemand: $('#stopOnDemand'),
    options_lightTheme: $('#lightTheme'),
    options_readOutNames: $('#readOutNames'),
    options_optionCancel: $('#optionCancel'),
  };
})();

new NamesPanel(nodes).init();
new OptionsPanel(nodes).init();
