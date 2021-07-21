import './style.scss';
import { getPassedTime, getWon } from '../../utils/convertToString.js';
import { createElement } from '../../utils/dom';
import bigHeart from '../../../public/assets/product/bigHeart.svg';
import filledBigHeart from '../../../public/assets/product/filledBigHeart.svg';
import menu from '../../../public/assets/product/product-menu.svg';
import heart from '../../../public/assets/product/heart.svg';
import comment from '../../../public/assets/product/comment.svg';

// TODO: 하트 버튼 상호작용
export default class ProductItem {
  constructor({ product, isMyProduct }) {
    this.$target = createElement({ tagName: 'div', classNames: ['product-item'] });
    this.product = product;
    this.isMyProduct = !!isMyProduct;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const { productImgUrl, title, town, createdDate, price, commentCount, likeCount, isLiked } = this.product;
    const passedTime = getPassedTime(createdDate);
    const won = getWon(price);

    this.$target.innerHTML = `
      <div>
        <img src=${productImgUrl} alt=${title} class="product-item-img" />
      </div>
      <div>
        <div class="product-item-infomation-wrapper">
          <div class="product-item-information">
            <div class="product-item-title">${title}</div>
            <div class="product-item-location-timestamp">
              <span>${town}</span>
              <span> ∙ </span>
              <span>${passedTime}</span>
            </div>
            <div class="product-item-price">${won}</div>
          </div>
          <div>
            ${
              this.isMyProduct
                ? `<img src=${menu} alt='menu-button'/>`
                : `<img src=${isLiked ? filledBigHeart : bigHeart} alt='like-button'/>`
            }
          </div>
        </div>
        <div class="product-item-comment-like">
          ${
            commentCount
              ? `<div>
                  <img src=${comment} alt="comment-count">
                  <span>${commentCount}</span>
                </div>`
              : ''
          }
          ${
            likeCount
              ? `<div>
                  <img src=${heart} alt="heart-count">
                  <span>${likeCount}</span>          
                </div>`
              : ''
          }
        </div>
      </div>
    `;
  }
}
