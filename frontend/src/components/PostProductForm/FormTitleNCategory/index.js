import './style.scss';
import { selectedCategoryState } from '../../../store/postPage';
import categories from '../../../utils/categories';
import { createElement } from '../../../utils/dom';
import { getState, setState, subscribe } from '../../../utils/globalObserver';

export default class FormTitleNCategory {
  constructor() {
    this.CATEGORY_LIST = categories;
    this.$target = createElement({ tagName: 'div', classNames: ['form-title-category'] });

    this.setSelectedCategory = setState(selectedCategoryState);
    this.init();
  }
  init() {
    subscribe(selectedCategoryState, this.render.bind(this));
    this.render();
    this.addEvent();
  }
  addEvent() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    const categoryElements = this.CATEGORY_LIST.reduce((acc, category) => {
      return (acc += this.renderCategoryBadge(category));
    }, '');
    this.$target.innerHTML = `
            <div class='form-title'>
              <input type='text' placeholder='글 제목' />
            </div>
            <div class='form-category'>
              <div>(필수)카테고리를 선택해주세요</div>
              <div class='form-category-list'>
                ${categoryElements}
              </div>
            </div> 
        `;
  }

  renderCategoryBadge(category) {
    const selectedCategory = getState(selectedCategoryState);
    const isSelected = selectedCategory === category;
    const className = 'category-badge ' + `${isSelected ? 'selected-category-badge' : ''}`;
    return `
        <div class='${className}'>${category}</div>
      `;
  }

  handleClick({ target }) {
    const categoryBadge = target.closest('.category-badge');
    if (!categoryBadge) return;

    this.setSelectedCategory(categoryBadge.textContent);
  }
}
