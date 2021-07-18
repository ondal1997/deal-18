import './style.scss';
import { createElement } from '../../utils/dom';
import TopBar from '../../components/Common/CommonTopBar';
import ChatDeleteBtn from '../../components/Chatting/ChatDeleteBtn';
import ChatProductInfo from '../../components/Chatting/ChatProductInfo';
import Chatting from '../../components/Chatting/Chatting';

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
    const { chatting: chattingData, userName } = this.chat;
    const chatProduct = this.getChatProductInfo();

    const topBar = new TopBar({ title: userName, className: 'chat-page-topbar', MenuBtn: ChatDeleteBtn }).$target;
    const chatProductInfo = new ChatProductInfo({ chatProduct }).$target;
    const chatting = new Chatting({ chatting: chattingData, userName: userName }).$target;

    this.$target.appendChild(topBar);
    this.$target.appendChild(chatProductInfo);
    this.$target.appendChild(chatting);
  }
  getChatProductInfo() {
    const { imgUrl, productName, price, isSelling } = this.chat;
    return { imgUrl, productName, price, isSelling };
  }
}

//목 데이터
import testImg0 from '../../../public/img/ImageLarge-0.png';

//시간순서대로 온다고 목데이터 가정
const chatting = [
  { userName: 'UserE', message: '안녕하세요! 궁금한게 있는데요' },
  { userName: '내 아이디', message: '네 안녕하세요!' },
  { userName: 'UserE', message: '혹시' },
  { userName: 'UserE', message: '실제로 신어볼 수 있는건가요' },
  { userName: '내 아이디', message: '네 안녕하세요!' },
  { userName: 'UserE', message: '혹시' },
  { userName: 'UserE', message: '실제로 신어볼 수 있는건가요' },
  { userName: '내 아이디', message: '네 안녕하세요!' },
  { userName: 'UserE', message: '혹시' },
  { userName: 'UserE', message: '실제로 신어볼 수 있는건가요' },
];

const chat = {
  imgUrl: testImg0,
  productName: '빈티지 롤러 스케이트',
  price: 160000,
  isSelling: true,
  userName: 'UserE',
  message: '실제로 신어볼 수 있는 건가요?',
  createDate: new Date('2021.07.14'),
  chatting: chatting,
};
