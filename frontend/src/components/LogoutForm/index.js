import './style.scss';
import { createElement } from '../../utils/dom';
import { getState, setState } from '../../utils/globalObserver';
import { userState } from '../../store/user';
import { fetchLogout, fetchMe } from '../../API/userAPI';
import { router } from '../..';

export default class LogoutForm {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['logout-form'] });
    this.userId = getState(userState).userId;
    this.setUserState = setState(userState);

    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  handleClick({ target }) {
    if (!target.closest('.button-large')) return;

    fetchLogout().then(() => {
      fetchMe().then((res) => {
        this.setUserState(res);
        router.pop();
      });
    });
  }

  render() {
    this.$target.innerHTML = `
        <div class="logout-form-username">${this.userId}</div>
        <button class="button-large" type="button">로그아웃</button>
    `;
  }
}
