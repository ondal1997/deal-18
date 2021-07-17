import TopBar from '../../components/Common/CommonTopBar';
import { createElement } from '../../utils/dom';

export default class MenuPage {
  constructor() {
    this.PAGE_TITLE = '메뉴';

    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const topBar = new TopBar({ title: this.PAGE_TITLE }).$target;

    this.$target.appendChild(topBar);
  }
}
