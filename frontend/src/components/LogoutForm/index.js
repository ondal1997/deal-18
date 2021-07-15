import './style.scss';
import { createElement } from '../../utils/dom';

export default class LogoutForm {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['logout-form'] });

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.$target.innerHTML = `
        <div class="logout-form-username">Username</div>
        <button class="button-large" type="button">로그아웃</button>
    `;
  }
}
