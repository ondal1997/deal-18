import ChatList from '../../components/ChatList';
import CommonTopBar from '../../components/Common/CommonTopBar';

import { createElement } from '../../utils/dom';
import { getState } from '../../utils/globalObserver';
import { pageState } from '../../store/page';
import { fetchGetProductChatList } from '../../api/chatAPI';

export default class ChatListPage {
  constructor() {
    this.PAGE_TITLE = '채팅하기';
    const { params } = getState(pageState);
    this.productId = params.productId;
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const topBar = new CommonTopBar({ title: this.PAGE_TITLE }).$target;
    this.$target.appendChild(topBar);

    this.getChatListElement().then((chatList) => this.$target.appendChild(chatList));
  }

  getChatListElement() {
    return fetchGetProductChatList(this.productId)
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((chats) => new ChatList({ chats }).$target)
      .catch(console.error);
  }
}
