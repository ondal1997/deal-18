import './style.scss';
import { createElement } from '../../utils/dom';
import RegisterPage from '../../pages/RegisterPage';
import { router } from '../../index';
import { fetchLogin } from '../../API/userAPI';
import { userState } from '../../store/user';
import { setState } from '../../utils/globalObserver';

export default class LoginForm {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['login-form'] });
    this.setUserState = setState(userState);

    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  handleClick({ target }) {
    if (target.closest('.register')) {
      router.push('/register');
    }

    if (target.closest('.button-large')) {
      this.handleClickLogin();
    }
  }

  handleClickLogin() {
    fetchLogin(this.$target.querySelector('.input-large').value)
      .then((res) => {
        this.setUserState(res);
        router.replace('/');
      })
      .catch(alert);
  }

  render() {
    this.$target.innerHTML = `
        <input class="input-large" type="text" placeholder="아이디를 입력하세요">
        <button class="button-large" type="button">로그인</button>
        <span class="text-large register">회원가입</span>
    `;
  }
}
