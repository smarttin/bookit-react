import { camelCase } from "camel-case";

class Cacher {
  cache = {};

  isValueCached(key) {
    return this.getCachedValue(key);
  }

  cacheValue(key, value) {
    this.cache[camelCase(key)] = value;
  }

  getCachedValue(key) {
    return this.cache[camelCase(key)];
  }
}

const cacher = new Cacher()
Object.freeze(cacher);

export default cacher;
