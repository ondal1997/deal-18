import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import { createElement } from '../../utils/dom';
import TopBar from '../../components/Common/CommonTopBar';
import LogoutForm from '../../components/LogoutForm';

export default class LogoutPage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.setPageState = setState(pageState);
    this.PAGE_TITLE = '내 계정';

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = '';
    this.$target.appendChild(new TopBar({ title: this.PAGE_TITLE }).$target);
    this.$target.appendChild(new LogoutForm().$target);
  }
}
