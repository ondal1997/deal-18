import './style.scss';
import { createElement } from '../../utils/dom';
import CategoryItem from './CategoryItem';
import categories from '../../utils/categories';
import { selectedCategoryState } from '../../store/postPage';
import { getState, setState, subscribe } from '../../utils/globalObserver';

export default class CategoryContainer {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['category-container'] });
    this.categories = categories;

    subscribe(selectedCategoryState, 'CategoryContainer', this.handleChangeSelectedCategory.bind(this));
    this.setSelectedCategoryState = setState(selectedCategoryState);

    this.init();
  }

  init() {
    this.render();
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  handleChangeSelectedCategory() {
    this.render();
  }

  handleClick({ target }) {
    const selected = target.closest('.category-item-wrapper');
    if (!selected) return;

    const { category } = selected.dataset;
    this.setSelectedCategoryState(category);
    this.render();
  }

  render() {
    this.$target.innerHTML = '';
    const selectedCategory = getState(selectedCategoryState);
    this.categories.forEach((category) => {
      const isSelected = selectedCategory === category;
      const categoryItem = new CategoryItem({ category, isSelected });

      // className 부여를 위한 wrapper
      const categoryItemWrapper = createElement({ tagName: 'div', classNames: ['category-item-wrapper'] });
      categoryItemWrapper.dataset.category = category;
      categoryItemWrapper.appendChild(categoryItem.$target);

      this.$target.appendChild(categoryItemWrapper);
    });
  }
}
