import ChatList from '../../components/ChatList';
import CommonTopBar from '../../components/Common/CommonTopBar';
import { createElement } from '../../utils/dom';

export default class ChatListPage {
  constructor() {
    this.PAGE_TITLE = '채팅하기';

    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const topBar = new CommonTopBar({ title: this.PAGE_TITLE }).$target;
    const chatList = new ChatList({ chats }).$target;

    this.$target.appendChild(topBar);
    this.$target.appendChild(chatList);
  }
}

import testImg0 from '../../../public/img/ImageLarge-0.png';
import testImg1 from '../../../public/img/ImageLarge-1.png';
import testImg2 from '../../../public/img/ImageLarge-2.png';
const chats = [
  {
    imgUrl: testImg0,
    userName: 'UserE',
    message: '실제로 신어볼 수 있는 건가요?',
    createDate: new Date('2021.07.14'),
    uncheckedMsgCount: 2,
  },
  {
    imgUrl: testImg1,
    userName: 'UserD',
    message: '감사합니다 :)',
    createDate: new Date('2021.07.14'),
    uncheckedMsgCount: 0,
  },
];
