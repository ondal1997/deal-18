import './style.scss';
import { getPassedTime, getWon } from '../../utils/convertToString.js';
import { createElement } from '../../utils/dom';
import bigHeart from '../../../public/assets/product/bigHeart.svg';
import filledBigHeart from '../../../public/assets/product/filledBigHeart.svg';
import heart from '../../../public/assets/product/heart.svg';
import comment from '../../../public/assets/product/comment.svg';

import testImg from '../../../public/img/ImageLarge-0.png';
const product = {
  imgUrl: testImg,
  title: '빈티지 밀크 글래스 어어어dkdkdkdkdkdkd',
  town: '구암동',
  createdDate: new Date('2021.07.14'),
  price: 24500,
  commentCount: 1,
  likeCount: 2,
  isLiked: true,
};

export default class ProductItem {
  // constructor({ product }) {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['product-item'] });
    this.product = product;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const { imgUrl, title, town, createdDate, price, commentCount, likeCount, isLiked } = this.product;
    const passedTime = getPassedTime(createdDate);
    const won = getWon(price);

    this.$target.innerHTML = `
      <div>
        <img src=${imgUrl} alt=${title} />
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
            <img src=${isLiked ? filledBigHeart : bigHeart} alt='like-button'/>
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
