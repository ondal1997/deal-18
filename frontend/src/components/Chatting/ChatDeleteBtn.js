import { createElement } from '../../utils/dom';
import ChatDeleteButton from '../../../public/assets/chatPage/ChatDeleteButton.svg';
import { setState } from '../../utils/globalObserver';
import { chattingDeletePopupState } from '../../store/store';

export default class ChatDeleteBtn {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['chat-delete-btn'] });

    this.setIsOpenDeletePopup = setState(chattingDeletePopupState);

    this.init();
  }
  init() {
    this.render();
    this.addEvent();
  }
  addEvent() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }
  render() {
    this.$target.innerHTML = `
      <img src=${ChatDeleteButton} alt='채팅 나가기 버튼' />
    `;
  }
  handleClick() {
    this.setIsOpenDeletePopup(true);
  }
}
