export default class Observable {
  constructor() {
    this._observers = new Set();
  }
  subscribe(observer) {
    this._observers.add(observer);
  }
  unsubscribe(observer) {
    this._observers.remove(observer);
  }
  notify(data) {
    this._observers.forEach((observer) => observer(data));
  }
}
