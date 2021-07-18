import './style.scss';
import { createElement } from '../../utils/dom';
import { getWon } from '../../utils/convertToString';

import bigHeart from '../../../public/assets/product/bigHeart.svg';
import filledBigHeart from '../../../public/assets/product/filledBigHeart.svg';

export default class ProductDetailBottomBar {
  constructor({ product }) {
    this.$target = createElement({ tagName: 'div', classNames: ['product-detail-bottom-bar'] });
    this.product = product;

    this.render();
  }

  render() {
    const won = getWon(this.product.price);

    this.$target.innerHTML = `
        <div class="heart-price-wrapper">
          <img src=${this.product.isLiked ? filledBigHeart : bigHeart} alt='like-button'/>
          <div class="divider"></div>
          <span class="price">${won}</span>
        </div>
        <button class="chat-button">
          문의하기
        </button>
      `;
  }
}
