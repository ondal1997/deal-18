import './style.scss';
import { createElement } from '../../utils/dom';

export default class LoginForm {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['login-form'] });

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = `
        <input class="input-large" type="text" placeholder="아이디를 입력하세요">
        <button class="button-large" type="button">로그인</button>
        <span class="text-large">회원가입</span>
    `;
  }
}
