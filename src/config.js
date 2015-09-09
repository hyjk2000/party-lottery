let Config = (() => {
  let instance = null;

  const defaults = {
    names: '',
    nameRemovedIndexes: [],
    removeAfterHit: true,
    stopOnDemand: false,
    lightTheme: false,
    readOutNames: false,
  };

  class Config {
    constructor() {
      if (instance) return instance;
      instance = this;

      for (let prop in defaults) {
        if (!defaults.hasOwnProperty(prop)) continue;
        let value = defaults[prop];
        let loaded = window.localStorage[prop];
        if (loaded == null || loaded == '') {
          this[prop] = value;
        } else {
          switch (typeof value) {
            case 'object':
              this[prop] = loaded.split(',');
              break;
            case 'boolean':
              this[prop] = loaded == '1';
              break;
            default:
              this[prop] = loaded;
          }
        }
      }
    }

    save() {
      for (let prop in defaults) {
        if (!defaults.hasOwnProperty(prop)) continue;
        let value = defaults[prop];
        switch (typeof value) {
          case 'object':
            window.localStorage[prop] = this[prop].join(',');
            break;
          case 'boolean':
            window.localStorage[prop] = this[prop] + 0;
            break;
          default:
            window.localStorage[prop] = this[prop]
        }
      }
    }
  }

  return Config;
})();
