export default class ModelStore {
  constructor() {
    this.models = {};
  }
  get(key) {
    return this.models[key];
  }
  set(models) {
    this.models = models;
  }
}
