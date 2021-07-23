import { createElement } from '../../utils/dom';
import { getState, setState } from '../../utils/globalObserver';
import { chattingDeletePopupState } from '../../store/store';
import { fetchDeleteChat } from '../../API/chatAPI';
import { router } from '../..';
import { pageState } from '../../store/page';

export default class ChattingDeletePopup {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['popup', 'chatting-delete-popup'] });

    this.ALERT_MSG = '정말로 이 채팅방을 나가시겠습니까?';

    const { params } = getState(pageState);
    this.chatId = params.chatId;
    this.setIsOpen = setState(chattingDeletePopupState);

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
        <div>${this.ALERT_MSG}</div>
        <div class='chat-popup-btns'>
          <div class='chat-popup-cancel-btn'>취소</div>
          <div class='chat-popup-confirm-btn'>나가기</div>
        </div>
      `;
  }
  handleClick({ target }) {
    if (this.isCancelBtn(target)) {
      this.setIsOpen(false);
      return;
    }

    if (this.isConfirmBtn(target)) {
      this.setIsOpen(false);
      this.deleteChatting();
      return;
    }
  }

  deleteChatting() {
    fetchDeleteChat(this.chatId)
      .then(() => router.pop())
      .catch(console.error); //TODO
  }

  isCancelBtn(target) {
    return target.closest('.chat-popup-cancel-btn');
  }
  isConfirmBtn(target) {
    return target.closest('.chat-popup-confirm-btn');
  }
}
