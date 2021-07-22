import './style.scss';
import ChatSendButton from '../../../public/assets/chatPage/ChatSendButton.svg';
import { getState, setState } from '../../utils/globalObserver';
import { createElement } from '../../utils/dom';
import { fetchSendChatting } from '../../API/chatAPI';
import { userState } from '../../store/user';
import { chattingState } from '../../store/chattingPage';

export default class Chatting {
  constructor({ chatId, chatting, userName }) {
    this.$target = createElement({ tagName: 'div', classNames: ['chatting'] });

    this.chatId = chatId;
    this.chatting = chatting;
    this.userName = userName;
    this.setChat = setState(chattingState);

    this.message = '';
    this.init();
  }
  init() {
    this.render();
    this.addEvent();
  }

  addEvent() {
    const input = this.$target.querySelector('input');
    this.$target.addEventListener('click', this.handleClick.bind(this));
    input.addEventListener('input', this.handleInput.bind(this));
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
  handleClick({ target }) {
    if (!this.isSendBtn(target)) return;

    const { userId } = getState(userState);
    const { chatting } = getState(chattingState);
    this.sendMessage({ userId, chatting });
  }

  sendMessage({ userId, chatting }) {
    if (!this.message) return;
    return fetchSendChatting(this.chatId, this.message)
      .then(({ success }) => {
        if (!success) throw Error('메세지 전송 실패');
        const newChatting = [...chatting, { userName: userId, message: this.message }];
        this.setChat((chat) => ({ ...chat, chatting: newChatting }));
      })
      .catch(console.erroe);
  }

  handleInput({ target }) {
    this.message = target.value;
  }
  isSendBtn(target) {
    return target.closest('.chatting-send-btn');
  }
}
