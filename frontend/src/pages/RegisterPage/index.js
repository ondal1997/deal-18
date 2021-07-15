import './style.scss';
import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import { createElement } from '../../utils/dom';
import TopBar from '../../components/Common/CommonTopBar';
import RegisterForm from '../../components/RegisterForm';

export default class RegisterPage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.setPageState = setState(pageState);
    this.PAGE_TITLE = '회원가입';

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = '';
    this.$target.appendChild(new TopBar({ title: this.PAGE_TITLE }).$target);
    this.$target.appendChild(new RegisterForm().$target);
  }
}
