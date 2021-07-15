import './style.scss';
import backBtn from '../../../../public/assets/topbar/backBtn.svg';
import { createElement } from '../../../utils/dom';

export default class CommonTopBar {
  constructor({ title, MenuBtn }) {
    this.$target = createElement({ tagName: 'div', classNames: ['top-bar'] });
    this.title = title || '';
    console.log(MenuBtn);
    this.MenuBtn = MenuBtn ? new MenuBtn().$target : '';

    this.init();
  }
  init() {
    this.render();
  }
  render() {
    this.$target.innerHTML = `
        <div>
          <img src=${backBtn} alt='go back'/>
        </div>
        <div>${this.title}</div>
        <div>${this.MenuBtn}</div>      
    `;
  }
}
