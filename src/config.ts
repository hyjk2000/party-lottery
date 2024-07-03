let instance: Config;

const props: Array<keyof Config> = [
  "names",
  "nameRemovedIndexes",
  "removeAfterHit",
  "stopOnDemand",
  "lightTheme",
  "readOutNames",
];

class Config {
  names = "";
  nameRemovedIndexes: number[] = [];
  removeAfterHit = true;
  stopOnDemand = false;
  lightTheme = false;
  readOutNames = false;

  constructor() {
    if (instance) return instance;
    instance = this;

    for (const prop of props) {
      let loaded = window.localStorage.getItem(prop);
      if (loaded !== null) {
        switch (typeof this[prop]) {
          case "object":
            // @ts-expect-error TypeScript could not correctly narrow down the type of `this[prop]`
            this[prop] = loaded.split(",").map((v) => ~~v);
            break;
          case "boolean":
            // @ts-expect-error TypeScript could not correctly narrow down the type of `this[prop]`
            this[prop] = loaded === "1";
            break;
          case "string":
            // @ts-expect-error TypeScript could not correctly narrow down the type of `this[prop]`
            this[prop] = loaded;
            break;
        }
      }
    }
  }

  save() {
    for (const prop of props) {
      const value = this[prop];
      switch (typeof value) {
        case "object":
          window.localStorage.setItem(prop, value.join(","));
          break;
        case "boolean":
          // @ts-expect-error this is a quirky but valid type coercion
          window.localStorage.setItem(prop, value + 0);
          break;
        case "string":
          window.localStorage.setItem(prop, value);
          break;
      }
    }
  }
}

export default Config;
