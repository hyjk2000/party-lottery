const $ = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector)!;

const $$ = <T extends HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector))!;

const Nodes = {
  wrapper: $("#wrapper"),
  namesPanel: $("#namesPanel"),
  nameNodes: () => $$(".name"),
  nameNodesLeft: () => $$(".name:not(.on):not(.disabled)"),
  nameOnNode: () => $(".name.on"),
  resetBtn: $("#reset-btn"),
  clickArea: $("#click-area"),
  optionsBtn: $("#options-btn"),
  optionsPanel: $("#optionsPanel"),
  optionsForm: $<HTMLFormElement>("#options-form"),
  options_names: $<HTMLTextAreaElement>("#names"),
  options_removeAfterHit: $<HTMLInputElement>("#removeAfterHit"),
  options_stopOnDemand: $<HTMLInputElement>("#stopOnDemand"),
  options_lightTheme: $<HTMLInputElement>("#lightTheme"),
  options_readOutNames: $<HTMLInputElement>("#readOutNames"),
  options_optionCancel: $("#optionCancel"),
};

export default Nodes;
