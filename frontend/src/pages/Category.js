export default class Category {
  constructor() {
    this.$target = document.createElement('div');

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = '<h1>카테고리</h1>';
  }
}
