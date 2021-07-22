import './style.scss';
import { getPassedTime, getWon } from '../../utils/convertToString.js';
import { createElement } from '../../utils/dom';
import bigHeart from '../../../public/assets/product/bigHeart.svg';
import filledBigHeart from '../../../public/assets/product/filledBigHeart.svg';
import menu from '../../../public/assets/product/product-menu.svg';
import heart from '../../../public/assets/product/heart.svg';
import comment from '../../../public/assets/product/comment.svg';
import { router } from '../..';
import { fetchToggleLike } from '../../api/productAPI';

export default class ProductItem {
  constructor({ product, isMyProduct }) {
    this.$target = createElement({ tagName: 'div', classNames: ['product-item'] });
    this.product = product;
    this.isLiked = product.isLiked;
    this.isMyProduct = !!isMyProduct;
    this.init();
  }

  init() {
    this.render();
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick({ target }) {
    if (target.closest('.like-button')) {
      this.handleClickToggleLike();
      return;
    }

    if (target.closest('.menu-button')) {
      // TODO: 메뉴 드롭다운 (수정하기, 삭제하기)
      return;
    }

    // 상품상세페이지로 이동
    router.push(`/products/${this.product.id}`);
  }

  handleClickToggleLike() {
    const currentIsLiked = this.isLiked;
    fetchToggleLike(this.product.id, currentIsLiked)
      .then(() => {
        this.isLiked = !currentIsLiked;
        this.render();
      })
      .catch((error) => alert(error));
  }

  render() {
    const { productImgUrl, title, town, createdDate, price, commentCount, likeCount } = this.product;
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
                ? `<img class="menu-button" src=${menu} alt='menu-button'/>`
                : `<img class="like-button" src=${this.isLiked ? filledBigHeart : bigHeart} alt='like-button'/>`
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
