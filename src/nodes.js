let $ = (selector) => {
  return document.querySelector(selector);
}

let $$ = (selector) => {
  return Array.from(document.querySelectorAll(selector));
};

let Nodes = {
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
  options_optionCancel: $('#optionCancel')
};

export default Nodes;
