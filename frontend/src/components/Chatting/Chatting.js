import './style.scss';
import ChatSendButton from '../../../public/assets/chatPage/ChatSendButton.svg';
import { createElement } from '../../utils/dom';

export default class Chatting {
  constructor({ chatting, userName }) {
    this.$target = createElement({ tagName: 'div', classNames: ['chatting'] });

    this.chatting = chatting;
    this.userName = userName;
    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const chattingElements = this.chatting.reduce((acc, { userName, message }) => {
      const isReceive = userName === this.userName;
      return (acc += `<div class=${isReceive ? 'receive-msg' : 'sent-msg'}>${message}</div>`);
    }, '');

    this.$target.innerHTML = `<div class='chatting-box'>${chattingElements}</div>`;
    this.$target.innerHTML += `
        <div class='chatting-input'>
          <input type='text' placeholder='메세지를 입력하세요.' />
          <div class='chatting-send-btn'>
            <img src=${ChatSendButton} alt='메세지 전송 버튼' />
          </div>
        </div>
    `;
  }
}

// const chatting = [
//     { userName: 'UserE', message: '안녕하세요! 굼금한게 있는데요' },
//     { userName: '내 아이디', message: '네 안녕하세요!' },
//     { userName: 'UserE', message: '혹시' },
//     { userName: 'UserE', message: '실제로 신어볼 수 있는건가요' },
//   ];
