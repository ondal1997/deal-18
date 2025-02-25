import './style.scss';
import { createElement } from '../../utils/dom.js';
import { setState } from '../../utils/globalObserver';
import { locationInputPopupState } from '../../store/store';
import { fetchPostTown } from '../../API/townAPI';
import { userState } from '../../store/user';

export default class LocationInputPopup {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['popup', 'location-input-popup'] });
    this.setIsOpen = setState(locationInputPopupState);
    this.setUserState = setState(userState);
    this.$input;
    this.mount();
  }
  mount() {
    this.render();
    this.$input = this.$target.querySelector('input');
    this.addEvent();
  }

  addEvent() {
    const confirmBtn = this.$target.querySelector('.confirm-btn');
    this.$input.addEventListener('input', this.handleInput.bind(this, confirmBtn));

    this.$target.addEventListener('click', this.handleClick.bind(this, confirmBtn));
  }

  render() {
    this.$target.innerHTML = `
        <div>현재 위치를 입력하세요.</div>
        <input type='text' placeholder='시∙구 제외, 동만 입력'/>
        <div class='input-submit-btns'>
          <div class='cancel-btn'>취소</div>
          <div class='confirm-btn'>확인</div>
        </div>
    `;
  }

  handleInput(confirmBtn, { target }) {
    if (target.value.length) confirmBtn.classList.add('available');
    else confirmBtn.classList.remove('available');
  }

  handleClick(confirmBtn, { target }) {
    if (this.isCancelBtn(target)) {
      confirmBtn.classList.remove('available');
      this.setIsOpen(false);
    }

    if (this.isAbleConfirmBtn(target)) {
      this.addTown();
      this.setIsOpen(false);
    }
    this.$input.value = '';
  }

  addTown() {
    const town = this.$input.value;
    fetchPostTown({ town })
      .then((towns) => this.setUserState((data) => ({ ...data, towns })))
      .catch(console.error); //TODO
  }

  isCancelBtn(target) {
    return target.closest('.cancel-btn');
  }

  isAbleConfirmBtn(target) {
    return target.closest('.confirm-btn') && target.classList.contains('available');
  }
}
