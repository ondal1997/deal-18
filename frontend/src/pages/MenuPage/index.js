import TopBar from '../../components/Common/CommonTopBar';
import MenuTab from '../../components/MenuTab';
import { menuTabState } from '../../store/menuPage';
import { createElement } from '../../utils/dom';
import { subscribe } from '../../utils/globalObserver';

export default class MenuPage {
  constructor() {
    this.PAGE_TITLE = '메뉴';

    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.init();
  }
  init() {
    subscribe(menuTabState, this.render.bind(this));
    this.render();
  }
  render() {
    this.$target.innerHTML = '';

    const topBar = new TopBar({ title: this.PAGE_TITLE }).$target;
    const menuTab = new MenuTab().$target;

    this.$target.appendChild(topBar);
    this.$target.appendChild(menuTab);
  }
}
