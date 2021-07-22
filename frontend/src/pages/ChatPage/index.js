import './style.scss';
import { createElement } from '../../utils/dom';
import { getState, setState, subscribe } from '../../utils/globalObserver';
import CommonTopBar from '../../components/Common/CommonTopBar';
import ChatDeleteBtn from '../../components/Chatting/ChatDeleteBtn';
import ChatProductInfo from '../../components/Chatting/ChatProductInfo';
import Chatting from '../../components/Chatting/Chatting';

import { fetchGetChatDetail } from '../../API/chatAPI';
import { chattingState } from '../../store/chattingPage';
import { pageState } from '../../store/page';

export default class ChatPage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });

    const { params } = getState(pageState);
    this.chatId = params.chatId;
    this.setChat = setState(chattingState);

    this.init();
  }
  init() {
    subscribe(chattingState, 'ChatPage', this.render.bind(this));
    this.render();

    this.initChatState();
  }

  initChatState() {
    fetchGetChatDetail(this.chatId)
      .then((chatDetail) => this.setChat(chatDetail))
      .catch(console.error);
  }

  render() {
    this.$target.innerHTML = '';
    const chat = getState(chattingState);
    if (!chat) return;

    const { chatting: chattingData, userName } = chat;
    const chatProduct = this.getChatProductInfo(chat);

    const topBar = new CommonTopBar({
      title: userName,
      className: 'chat-page-topbar',
      menuBtn: new ChatDeleteBtn().$target,
    }).$target;
    const chatProductInfo = new ChatProductInfo({ chatProduct }).$target;
    const chatting = new Chatting({ chatting: chattingData, userName: userName }).$target;

    this.$target.appendChild(topBar);
    this.$target.appendChild(chatProductInfo);
    this.$target.appendChild(chatting);

    this.setChattingScroll();
  }

  getChatProductInfo(chat) {
    const { imgUrl, productName, price, state } = chat;
    return { imgUrl, productName, price, state };
  }

  setChattingScroll() {
    const chattingSheet = this.$target.querySelector('.chatting-box');
    chattingSheet.scrollTop = chattingSheet.scrollHeight;
  }
}
