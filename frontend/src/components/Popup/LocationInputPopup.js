import './style.scss';
import { createElement } from '../../utils/dom.js';
import { setState } from '../../utils/globalObserver';
import { locationInputPopupState } from '../../store/store';

export default class LocationInputPopup {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['popup', 'location-input-popup'] });
    this.setIsOpen = setState(locationInputPopupState);
    this.init();
  }
  init() {
    this.render();
    this.addEvent();
  }

  addEvent() {
    const input = this.$target.querySelector('input');
    const confirmBtn = this.$target.querySelector('.confirm-btn');
    input.addEventListener('keyup', this.handleKeyup.bind(this, confirmBtn));

    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    this.$target.innerHTML = `
        <div>현재 위치를 입력하세요.</div>
        <input type='text' placeholder='시∙구 제외, 동만 입력'/>
        <div class='input-submit-btns'>
          <div class='cancle-btn'>취소</div>
          <div class='confirm-btn ${this.isInputValue ? 'available' : ''}'>확인</div>
        </div>
    `;
  }

  handleKeyup(confirmBtn, { target }) {
    if (target.value.length) confirmBtn.classList.add('available');
    else confirmBtn.classList.remove('available');
  }

  handleClick({ target }) {
    if (this.isCancleBtn(target)) this.setIsOpen(false);
  }

  isCancleBtn(target) {
    return target.closest('.cancle-btn');
  }
}
