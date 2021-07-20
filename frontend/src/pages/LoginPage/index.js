import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import { createElement } from '../../utils/dom';
import CommonTopBar from '../../components/Common/CommonTopBar';
import LoginForm from '../../components/LoginForm';

export default class LoginPage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.setPageState = setState(pageState);
    this.PAGE_TITLE = '로그인';

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = '';
    this.$target.appendChild(new CommonTopBar({ title: this.PAGE_TITLE }).$target);
    this.$target.appendChild(new LoginForm().$target);
  }
}
