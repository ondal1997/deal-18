import './style.scss';
import backBtn from '../../../../public/assets/topbar/backBtn.svg';
import { createElement } from '../../../utils/dom';
import { router } from '../../../index';

export default class CommonTopBar {
  constructor({ title, menuBtn, className }) {
    this.$target = createElement({ tagName: 'div', classNames: ['top-bar', 'common-top-bar', className] });
    this.$menuBtnBox = createElement({ tagName: 'div', classNames: ['menu-btn'] });

    this.title = title || '';
    this.menuBtn = menuBtn || '';

    this.init();
  }
  init() {
    this.renderMenuBtnBox();
    this.render();
    this.addEvent();
  }
  addEvent() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    if (target.closest('.back-btn')) router.pop();
  }
  //appendChild, innerHTML을 일단 적용해 놨다. 추후 고민 필요
  //반복적인 querySelector도 애매함
  render() {
    this.$target.innerHTML = `
        <div class='back-btn'>
          <img src=${backBtn} alt='go back'/>
        </div>
        <div>${this.title}</div>
    `;

    this.$target.appendChild(this.$menuBtnBox);
  }
  renderMenuBtnBox() {
    if (this.menuBtn) this.$menuBtnBox.appendChild(this.menuBtn);
  }
}

/***
 * menuBtn이 조건부로 생성될 것 같다.
 *
 * TODO
 * 이를 사용하는 곳에서 handleClick 함수를 넘겨줘서 사용해야될 것 같다.
 *
 */
