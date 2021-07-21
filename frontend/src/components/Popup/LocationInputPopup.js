import './style.scss';
import { createElement } from '../../utils/dom.js';
import { setState } from '../../utils/globalObserver';
import { locationInputPopupState } from '../../store/store';
import { fetchPostTown } from '../../API/townAPI';
import { locationState } from '../../store/townPage';

export default class LocationInputPopup {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['popup', 'location-input-popup'] });
    this.setIsOpen = setState(locationInputPopupState);
    this.setLocationState = setState(locationState);
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
          <div class='cancle-btn'>취소</div>
          <div class='confirm-btn'>확인</div>
        </div>
    `;
  }

  handleInput(confirmBtn, { target }) {
    if (target.value.length) confirmBtn.classList.add('available');
    else confirmBtn.classList.remove('available');
  }

  handleClick(confirmBtn, { target }) {
    if (this.isCancleBtn(target)) {
      this.setIsOpen(false);
      this.$input.value = '';
      confirmBtn.classList.remove('available');
    }

    if (this.isAbleConfirmBtn(target)) {
      this.addTown();
    }
  }

  addTown() {
    const town = this.$input.value;
    fetchPostTown({ towns: town })
      .then((res) => this.setLocationState((data) => ({ ...data, locations: res.towns })))
      .catch(alert); //TODO
  }

  isCancleBtn(target) {
    return target.closest('.cancle-btn');
  }

  isAbleConfirmBtn(target) {
    return target.closest('.confirm-btn') && target.classList.contains('available');
  }
}
