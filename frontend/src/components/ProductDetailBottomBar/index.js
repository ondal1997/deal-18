import './style.scss';
import { createElement } from '../../utils/dom';
import { getWon } from '../../utils/convertToString';

import bigHeart from '../../../public/assets/product/bigHeart.svg';
import filledBigHeart from '../../../public/assets/product/filledBigHeart.svg';

export default class ProductDetailBottomBar {
  constructor({ product }) {
    this.$target = createElement({ tagName: 'div', classNames: ['product-detail-bottom-bar'] });
    this.product = product;
    this.isLiked = this.product.isLiked;

    this.addListener();
    this.render();
  }

  addListener() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick({ target }) {
    if (target.closest('.toggle-heart')) {
      // 관심 API 호출하기
      this.isLiked = !this.isLiked;
      this.render();
    }

    if (target.closest('.chats-button')) {
      // (판매자 전용) 채팅 목록 보기
    }

    if (target.closest('contact-button')) {
      // 문의하기
    }
  }

  render() {
    const won = getWon(this.product.price);

    let buttonHTML;
    if (!this.product.isYours) {
      buttonHTML = `  
        <button class="contact-button button">
          문의하기
        </button>
      `;
    } else if (this.product.commentCount) {
      buttonHTML = `
      <button class="chats-button button">
        채팅 목록 보기(${this.product.commentCount})
      </button>
      `;
    } else {
      buttonHTML = `
      <button class="chats-button button" disabled>
        채팅 목록 보기
      </button>
      `;
    }

    this.$target.innerHTML = `
        <div class="heart-price-wrapper">
          <img class="toggle-heart" src=${
            this.isLiked ? filledBigHeart : bigHeart
          } alt='like-button' width="24px" height="22px"/>
          <div class="divider"></div>
          <span class="price">${won}</span>
        </div>
        ${buttonHTML}
      `;
  }
}
