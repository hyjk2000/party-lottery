let nodes = (function() {
  let $ = (selector) => {
    let list = [].slice.call(document.querySelectorAll(selector));
    return list.length == 1 ? list[0] : list;
  };

  return {
    wrapper: $('#wrapper'),
    namesPanel: $('#namesPanel'),
    nameNodes: () => $('.name'),
    nameOnNode: () => $('.name.on'),
    resetBtn: $('#reset-btn'),
    clickArea: $('#click-area'),
    optionsBtn: $('#options-btn'),
    optionsPanel: $('#optionsPanel'),
    optionsForm: $('#options-form'),
    optionsBrowserChk: $('.browser-compatibility-checks'),
    options_names: $('#names'),
    options_removeAfterHit: $('#removeAfterHit'),
    options_stopOnDemand: $('#stopOnDemand'),
    options_lightTheme: $('#lightTheme'),
    options_readOutNames: $('#readOutNames'),
    options_optionCancel: $('#optionCancel'),
    options_optionClear: $('#optionClear'),
  };
})();

new NamesPanel(nodes).init();
new OptionsPanel(nodes).init();
