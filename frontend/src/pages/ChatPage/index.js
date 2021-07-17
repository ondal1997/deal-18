import './style.scss';
import { createElement } from '../../utils/dom';
import TopBar from '../../components/Common/CommonTopBar';
import ChatDeleteBtn from '../../components/Chatting/ChatDeleteBtn';
import ChatProductInfo from '../../components/Chatting/ChatProductInfo';

export default class ChatPage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.chat = chat; // 아마 리스트에서 채팅 id 인자로 받아와서 API요청해서 chat-data 얻어올 듯?
    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const chatProduct = this.getChatProductInfo();

    const topBar = new TopBar({ title: this.chat.userName, className: 'chat-page-topbar', MenuBtn: ChatDeleteBtn })
      .$target;
    const chatProductInfo = new ChatProductInfo({ chatProduct }).$target;

    this.$target.appendChild(topBar);
    this.$target.appendChild(chatProductInfo);
  }
  getChatProductInfo() {
    const { imgUrl, productName, price, isSelling } = this.chat;
    return { imgUrl, productName, price, isSelling };
  }
}

import testImg0 from '../../../public/img/ImageLarge-0.png';
const chat = {
  imgUrl: testImg0,
  productName: '빈티지 롤러 스케이트',
  price: 160000,
  isSelling: true,
  userName: 'UserE',
  message: '실제로 신어볼 수 있는 건가요?',
  createDate: new Date('2021.07.14'),
};
