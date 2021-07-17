import { createElement } from '../../utils/dom';
import ChatDeleteButton from '../../../public/assets/chatPage/ChatDeleteButton.svg';

export default class ChatDeleteBtn {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['chat-delete-btn'] });
    this.init();
  }
  init() {
    this.render();
  }
  render() {
    this.$target.innerHTML = `
      <img src=${ChatDeleteButton} alt='채팅 나가기 버튼' />
    `;
  }
}
