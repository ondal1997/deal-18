import { createElement } from '../../utils/dom';

export default class ChattingDeletePopup {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['popup', 'chatting-delete-popup'] });

    this.ALERT_MSG = '정말로 이 채팅방을 나가시겠습니까?';

    this.init();
  }
  init() {
    this.render();
  }
  render() {
    this.$target.innerHTML = `
        <div>${this.ALERT_MSG}</div>
        <div class='chat-popup-btns'>
          <div class='chat-popup-cancle-btn'>취소</div>
          <div class='chat-popup-confirm-btn'>나가기</div>
        </div>
      `;
  }
}
