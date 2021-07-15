import './style.scss';
import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import HomePage from '../HomePage';
import { createElement } from '../../utils/dom';

export default class CategoryPage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.$target.classList.add('page');
    this.setPageState = setState(pageState);
    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  handleClick({ target }) {
    if (!target.classList.contains('move-page')) return;

    this.setPageState({ Page: HomePage, direction: 'right' });
  }

  render() {
    this.$target.innerHTML = `
      <h1>카테고리</h1>
      <button class="move-page">홈 이동</button>
    `;
  }
}
