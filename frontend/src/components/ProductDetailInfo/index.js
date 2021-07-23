import './style.scss';
import { createElement } from '../../utils/dom';
import { getPassedTime } from '../../utils/convertToString';

import downIcon from '../../../public/assets/product/small-chevron-down.svg';
import { fetchUpdateProductState } from '../../API/productAPI';

class ProductStateController {
  constructor({ product }) {
    this.$target = createElement({ tagName: 'div', classNames: ['product-state-controller'] });
    this.product = product;
    this.state = this.product.state;

    this.isOpen = false;

    this.addListener();
    this.render();
  }

  addListener() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick({ target }) {
    if (target.closest('.button-toggle-dropdown')) {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        const handleMousedown = ({ target }) => {
          if (target.closest('.product-state-controller') === this.$target && target.closest('.dropdown-wrapper')) {
            return;
          }

          document.removeEventListener('mousedown', handleMousedown);
          this.isOpen = false;
          this.render();
        };

        document.addEventListener('mousedown', handleMousedown);
      }
    }

    if (target.closest('.button-sale')) {
      this.handleChangeProductState('판매중');
    }

    if (target.closest('.button-reserved')) {
      this.handleChangeProductState('예약중');
    }

    if (target.closest('.button-soldout')) {
      this.handleChangeProductState('판매완료');
    }

    this.render();
  }

  handleChangeProductState(state) {
    fetchUpdateProductState(this.product, state)
      .then(() => {
        this.state = state;
        this.render();
      })
      .catch((error) => alert(error));
  }

  render() {
    if (!this.product.isYours) {
      return;
    }

    const { state } = this;

    let html = '';
    html += `
      <button class="button-toggle-dropdown">${state}<img src="${downIcon}" alt=""></button>
    `;
    if (this.isOpen) {
      html += `
      <div class="dropdown-wrapper">
        <div class="dropdown">
          ${state !== '판매중' ? '<div class="dropdown-item button-sale">판매중으로 변경</div>' : ''}
          ${state !== '예약중' ? '<div class="dropdown-item button-reserved">예약중으로 변경</div>' : ''}
          ${state !== '판매완료' ? '<div class="dropdown-item button-soldout">판매완료로 변경</div>' : ''}
        </div>
      </div>`;
    }

    this.$target.innerHTML = html;
  }
}

export default class ProductDetailInfo {
  constructor({ product }) {
    this.$target = createElement({ tagName: 'div', classNames: ['product-detail-info'] });
    this.product = product;
    this.productStateController = new ProductStateController({ product });

    this.render();
  }

  render() {
    const { title, category, createdDate, description, commentCount, likeCount, watchCount, userId, town } =
      this.product;
    const passedTime = getPassedTime(createdDate);
    const info = createElement({ tagName: 'div', classNames: ['product-detail-content'] });
    info.innerHTML = `
    <span class="name">${title}</span>
    <span class="text-small">${category} ∙ ${passedTime}</span>
    <pre class="description">${description}</pre>
    <span class="text-small">채팅 ${commentCount} ∙ 관심 ${likeCount} ∙ 조회 ${watchCount}</span>
    <div class="user-info-wrapper">
      <span class="text-medium">판매자 정보</span>
      <div class="user-info">
        <span class="text-medium">${userId}</span>
        <span class="text-small">${town}</span>
      <div>
    </div>
  `;

    this.$target.appendChild(this.productStateController.$target);
    this.$target.appendChild(info);
  }
}
