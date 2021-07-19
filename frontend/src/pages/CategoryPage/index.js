import './style.scss';
import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import HomePage from '../HomePage';
import { createElement } from '../../utils/dom';
import CommonTopBar from '../../components/Common/CommonTopBar';
import CategoryContainer from '../../components/CategoryContainer';

export default class CategoryPage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.setPageState = setState(pageState);
    this.PAGE_TITLE = '카테고리';

    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  handleClick({ target }) {
    if (!target.classList.contains('move-page')) return;

    this.setPageState({ Page: HomePage, direction: 'left' });
  }

  render() {
    this.$target.innerHTML = '';
    this.$target.appendChild(new CommonTopBar({ title: this.PAGE_TITLE }).$target);
    this.$target.appendChild(new CategoryContainer().$target);
  }
}
