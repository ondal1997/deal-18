import './style.scss';
import TopBar from '../../components/Common/CommonTopBar';
import { createElement } from '../../utils/dom';

export default class ChatPage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.chat = chat;
    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const topBar = new TopBar({ title: this.chat.userName, className: 'chat-page-topbar' }).$target;

    this.$target.appendChild(topBar);
  }
}

import testImg0 from '../../../public/img/ImageLarge-0.png';
const chat = {
  imgUrl: testImg0,
  userName: 'UserE',
  message: '실제로 신어볼 수 있는 건가요?',
  createDate: new Date('2021.07.14'),
};
