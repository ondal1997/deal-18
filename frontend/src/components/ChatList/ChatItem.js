import './style.scss';
import { createElement } from '../../utils/dom';
import { getPassedTime } from '../../utils/convertToString';
import { router } from '../..';

export default class ChatItem {
  constructor({ chat }) {
    this.$target = createElement({ tagName: 'div', classNames: ['chat-item-wrapper'] });

    this.chat = chat;
    this.isUncheckedChat = !!this.chat.uncheckedMsgCount;

    this.init();
  }
  init() {
    if (this.isUncheckedChat) this.$target.classList.add('unchecked-chat');
    this.render();
    this.addEvent();
  }
  addEvent() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }
  render() {
    const { imgUrl, userName, message, createDate, uncheckedMsgCount } = this.chat;
    const passedTime = getPassedTime(createDate);
    this.$target.innerHTML = `
        <div class='chat-item'>
            <div>
                <div class='chat-info'>
                    <div class='chat-title'>${userName}</div> 
                    <div class='chat-timestamp'>${passedTime}</div>
                </div>
                <div class='chat-info'>
                    <div class='chat-msg'>${message}</div>
                    <div class='${this.isUncheckedChat ? 'chat-uncheck' : ''}'>${uncheckedMsgCount || ''}</div>
                </div>
            </div>
            <div class='chat-img'>
                <img src=${imgUrl} alt='상품 이미지'/>
            </div>
        </div>
    `;
  }
  handleClick() {
    router.push('chat');
  }
}

/*
{
    imgUrl: testImg0,
    userName: 'UserE',
    message: '실제로 신어볼 수 있는 건가요?',
    createDate: new Date('2021.07.14'),
    unCheckedMsgCount: 2,
  },
  */
