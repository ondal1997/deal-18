import './style.scss';
import { createElement } from '../../utils/dom';
import backBtn from '../../../public/assets/product/chevron-left.svg';
import moreBtn from '../../../public/assets/product/more.svg';
import { router } from '../../index';

export default class ProductDetailTopBar {
  constructor({ product }) {
    this.$target = createElement({ tagName: 'div', classNames: ['product-detail-top-bar'] });

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
        <div>
          <img src=${moreBtn} alt='go back'/>
        </div>
    `;
  }
}
