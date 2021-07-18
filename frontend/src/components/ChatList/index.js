import './style.scss';
import { createElement } from '../../utils/dom';
import ChatItem from './ChatItem';

export default class ChatList {
  constructor({ chats }) {
    this.$target = createElement({ tagName: 'div', classNames: ['chat-list'] });
    this.chats = chats;

    this.init();
  }
  init() {
    this.render();
  }
  render() {
    this.chats.forEach((chat) => {
      const chatItem = new ChatItem({ chat }).$target;
      this.$target.appendChild(chatItem);
    });
  }
}
