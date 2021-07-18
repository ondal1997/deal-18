import './style.scss';
import backBtn from '../../../../public/assets/topbar/backBtn.svg';
import { createElement } from '../../../utils/dom';
import { router } from '../../../index';

export default class CommonTopBar {
  constructor({ title, MenuBtn, className }) {
    this.$target = createElement({ tagName: 'div', classNames: ['top-bar', 'common-top-bar', className] });
    this.title = title || '';
    this.MenuBtn = typeof MenuBtn === 'function' ? new MenuBtn().$target : '';

    this.init();
  }
  init() {
    this.render();
    this.addEvent();
  }
  addEvent() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    if (target.closest('.back-btn')) router.pop();
  }
  render() {
    this.$target.innerHTML = `
        <div class='back-btn'>
          <img src=${backBtn} alt='go back'/>
        </div>
        <div>${this.title}</div>
        <div class='menu-btn'>${this.MenuBtn}</div>      
    `;
    if (this.MenuBtn) {
      const menuBtnBox = this.getMenuBtnBox();
      menuBtnBox.appendChild(this.MenuBtn);
    }
  }
  getMenuBtnBox() {
    return this.$target.querySelector('.menu-btn');
  }
}

/***
 * menuBtn이 조건부로 생성될 것 같다.
 *
 * TODO
 * 이를 사용하는 곳에서 handleClick 함수를 넘겨줘서 사용해야될 것 같다.
 *
 */
