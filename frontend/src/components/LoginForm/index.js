import './style.scss';
import { createElement } from '../../utils/dom';
import RegisterPage from '../../pages/RegisterPage';
import { router } from '../../index';

export default class LoginForm {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['login-form'] });

    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  handleClick({ target }) {
    if (target.closest('.register')) {
      router.push('/register');
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
