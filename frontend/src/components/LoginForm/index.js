import './style.scss';
import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import { createElement } from '../../utils/dom';
import RegisterPage from '../../pages/RegisterPage';

export default class LoginForm {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['login-form'] });
    this.setPageState = setState(pageState);

    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  handleClick({ target }) {
    if (target.closest('.register')) {
      this.setPageState({ Page: RegisterPage, direction: 'right' });
    }
  }

  render() {
    this.$target.innerHTML = `
        <input class="input-large" type="text" placeholder="아이디를 입력하세요">
        <button class="button-large" type="button">로그인</button>
        <span class="text-large register">회원가입</span>
    `;
  }
}
