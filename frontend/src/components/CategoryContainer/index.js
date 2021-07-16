import './style.scss';
import { createElement } from '../../utils/dom';
import CategoryItem from './CategoryItem';
import categories from '../../utils/categories';

export default class CategoryContainer {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['category-container'] });
    this.categories = categories;

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = '';
    this.categories.forEach((category) => {
      const categoryItem = new CategoryItem({ category });
      this.$target.appendChild(categoryItem.$target);
    });
  }
}
