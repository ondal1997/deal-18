export default class Home {
  constructor() {
    this.$target = document.createElement('div');

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = '<h1>우아마켓</h1>';
  }
}
