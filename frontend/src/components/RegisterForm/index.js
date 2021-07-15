import './style.scss';
import { createElement } from '../../utils/dom';

export default class RegisterForm {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['register-form'] });

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = `
        <div class="input-wrapper">
          <span class="label">
            아이디
          </span>
          <input type="text" placeholer="영문, 숫자 조합 20자 이하">
        </div>

        <div class="input-wrapper">
          <span class="label">
            우리 동네
          </span>
          <input type="text" placeholer="시∙구 제외, 동만 입력">
        </div>

        <span class="text-large">회원가입</span>
    `;
  }
}
