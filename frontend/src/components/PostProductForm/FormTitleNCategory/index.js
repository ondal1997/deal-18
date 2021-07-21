import './style.scss';
import { selectedCategoryState } from '../../../store/postPage';
import categories from '../../../utils/categories';
import { createElement } from '../../../utils/dom';
import { getState, setState, subscribe } from '../../../utils/globalObserver';

export default class FormTitleNCategory {
  constructor({ inputInfo, setInputInfo, setIsAbleSubmit }) {
    this.CATEGORY_LIST = categories;
    this.$target = createElement({ tagName: 'div', classNames: ['form-title-category'] });
    this.$title = createElement({ tagName: 'div', classNames: ['form-title'] });
    this.$category = createElement({ tagName: 'div', classNames: ['form-category'] });

    this.inputInfo = inputInfo;
    this.setInputInfo = setInputInfo;
    this.setSelectedCategory = setState(selectedCategoryState);
    this.setIsAbleSubmit = setIsAbleSubmit;

    this.mount();
    this.addEvent();
  }
  mount() {
    subscribe(selectedCategoryState, 'FormTitleNCategory', this.renderCategory.bind(this));
    this.renderTitle();
    this.renderCategory();
    this.render();
  }
  addEvent() {
    this.$title.addEventListener('input', this.handleInputTitle.bind(this));
    this.$category.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    this.$target.appendChild(this.$title);
    this.$target.appendChild(this.$category);
  }

  renderCategory() {
    const categoryElements = this.CATEGORY_LIST.reduce((acc, category) => {
      return (acc += this.renderCategoryBadge(category));
    }, '');
    this.$category.innerHTML = categoryElements;
  }

  renderCategoryBadge(category) {
    const selectedCategory = getState(selectedCategoryState);
    const isSelected = selectedCategory === category;
    const className = 'category-badge ' + `${isSelected ? 'selected-category-badge' : ''}`;
    return `
        <div class='${className}'>${category}</div>
      `;
  }
  renderTitle() {
    this.$title.innerHTML = `<input type='text' value='${this.inputInfo.title}' placeholder='글 제목'  />`;
  }

  handleInputTitle({ target }) {
    this.setInputInfo({ title: target.value });
    this.setIsAbleSubmit();
  }

  handleClick({ target }) {
    const categoryBadge = target.closest('.category-badge');
    if (!categoryBadge) return;

    this.setSelectedCategory(categoryBadge.textContent);
    this.setIsAbleSubmit();
  }
}
