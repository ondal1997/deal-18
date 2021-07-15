import './style.scss';
import { createElement } from '../../utils/dom';

export default class CategoryItem {
  constructor({ category }) {
    this.category = category;
    this.$target = createElement({ tagName: 'div', classNames: ['category-item'] });

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = `
        <div class="category-item-iamge-wrapper"></div>
        <span class="category-item-category">${this.category}</span>
      `;
  }
}
