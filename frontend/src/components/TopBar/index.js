import './style.scss';
import categoryIcon from '../../../public/assets/homepage/category.svg';
import locationIcon from '../../../public/assets/homepage/location.svg';
import userIcon from '../../../public/assets/homepage/user.svg';
import menuIcon from '../../../public/assets/homepage/menu.svg';
import { createElement } from '../../utils/dom';

export default class TopBar {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['top-bar', 'top-bar-main'] });
    this.init();
  }
  init() {
    this.render();
  }
  render() {
    this.$target.innerHTML = `
        <div class="category"><img src=${categoryIcon}></div>
        <div class="location">
            <img src=${locationIcon}>
            <span>역삼동<span>
        </div>
        <div class='user-main-wrapper'>
            <div class='user'><img src=${userIcon}></div>
            <div class='menu'><img src=${menuIcon}></div>
        </div>
    `;
  }
}
