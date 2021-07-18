import './style.scss';
import { formCategoryState } from '../../../store/postPage';
import categories from '../../../utils/categories';
import { createElement } from '../../../utils/dom';
import { getState } from '../../../utils/globalObserver';

export default class FormTitleNCategory {
  constructor() {
    this.CATEGORY_LIST = categories;
    this.$target = createElement({ tagName: 'div', classNames: ['form-title-category'] });
    this.init();
  }
  init() {
    this.render();
    this.addEvent();
  }
  addEvent() {}

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
    const selectCategory = getState(formCategoryState);
    const isSelected = selectCategory === category;
    const className = isSelected ? 'category-badge selected-category-badge' : 'category-badge';
    return `
        <div class=${className}>${category}</div>
      `;
  }
}
