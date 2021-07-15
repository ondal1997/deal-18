import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import TopBar from '../../components/Common/TopBar';
import { createElement } from '../../utils/dom';

export default class LocationEditPage {
  constructor() {
    this.PAGE_TITLE = '내 동네 설정하기';

    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.setPageState = setState(pageState);

    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  render() {
    const topBar = new TopBar({ title: this.PAGE_TITLE }).$target;

    this.$target.appendChild(topBar);
  }

  handleClick() {}
}
