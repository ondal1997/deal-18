import { createElement } from '../../utils/dom';
import ChatDeleteButton from '../../../public/assets/chatPage/ChatDeleteButton.svg';
import { router } from '../..';

export default class ChatDeleteBtn {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['chat-delete-btn'] });
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
    //채팅 나가는 API
    router.pop();
  }
}
