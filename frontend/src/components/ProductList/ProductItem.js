import './style.scss';
import { getPassedTime, getWon } from '../../utils/convertToString.js';
import { createElement } from '../../utils/dom';
import bigHeart from '../../../public/assets/product/bigHeart.svg';
import filledBigHeart from '../../../public/assets/product/filledBigHeart.svg';
import menu from '../../../public/assets/product/product-menu.svg';
import heart from '../../../public/assets/product/heart.svg';
import comment from '../../../public/assets/product/comment.svg';
import { router } from '../..';
import { fetchDeleteProduct, fetchToggleLike } from '../../API/productAPI';

export default class ProductItem {
  constructor({ product, isMyProduct }) {
    this.$target = createElement({ tagName: 'div', classNames: ['product-item'] });
    this.product = product;
    this.isLiked = product.isLiked;
    this.isMyProduct = !!isMyProduct;
    this.isOpen = false;
    this.isDeleted = false;
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
      // 메뉴 드롭다운 (수정하기, 삭제하기)
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        const handleMousedown = ({ target }) => {
          if (target.closest('.product-item') === this.$target && target.closest('.dropdown-wrapper')) {
            return;
          }

          document.removeEventListener('mousedown', handleMousedown);
          this.isOpen = false;
          this.render();
        };

        document.addEventListener('mousedown', handleMousedown);
      }

      this.render();
      return;
    }

    if (target.closest('.edit')) {
      router.push(`/products/${this.product.id}/edit`);
      return;
    }

    if (target.closest('.remove')) {
      this.handleClickDeleteProduct();
      return;
    }

    // 상품상세페이지로 이동
    router.push(`/products/${this.product.id}`);
  }

  handleClickDeleteProduct() {
    fetchDeleteProduct(this.product.id)
      .then(() => {
        this.isDeleted = true;
        this.render();
      })
      .catch((error) => {
        alert(error);
      });
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
    if (this.isDeleted) {
      this.$target.innerHTML = '';
      this.$target.className = '';
      return;
    }
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
            ${
              this.isOpen
                ? `
                <div class='dropdown-wrapper'>
                  <div class='dropdown'>
                    <div class='dropdown-item edit'>수정하기</div>
                    <div class='dropdown-item warning remove'>삭제하기</div>
                  </div>  
                </div>
              `
                : ''
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
