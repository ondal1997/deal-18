import './style.scss';
import { createElement } from '../../utils/dom';
import { fetchSignUp } from '../../API/userAPI';
import { router } from '../..';

export default class RegisterForm {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['register-form'] });
    this.$id;
    this.$town;
    this.$regist;

    this.init();
  }

  init() {
    this.$target.addEventListener('input', this.handleInput.bind(this));
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  handleInput() {
    this.setDisabled(this.$id.value.length === 0 || this.$town.value.length === 0);
  }

  handleClick({ target }) {
    if (!target.closest('.register-form-regist')) return;

    fetchSignUp(this.$id.value, this.$town.value)
      .then((res) => {
        alert('회원가입을 축하합니다!'); // TODO
        router.pop();
      })
      .catch(alert); // TODO
  }

  setDisabled(disabled) {
    this.$regist.disabled = disabled;
  }

  render() {
    this.$target.innerHTML = `
        <div class="input-wrapper">
          <span class="label">
            아이디
          </span>
          <input class="register-form-id input-large" type="text" placeholder="영문, 숫자 조합 20자 이하">
        </div>

        <div class="input-wrapper">
          <span class="label">
            우리 동네
          </span>
          <input class="register-form-town input-large" type="text" placeholder="시∙구 제외, 동만 입력">
        </div>

        <button class="register-form-regist button-large" type="button" disabled>회원가입</span>
    `;

    this.$id = this.$target.querySelector('.register-form-id');
    this.$town = this.$target.querySelector('.register-form-town');
    this.$regist = this.$target.querySelector('.register-form-regist');
  }
}
