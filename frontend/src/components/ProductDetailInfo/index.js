import './style.scss';
import { createElement } from '../../utils/dom';
import { getPassedTime } from '../../utils/convertToString';

import downIcon from '../../../public/assets/product/small-chevron-down.svg';

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
    } else {
      this.isOpen = false;
    }

    if (target.closest('.button-sale')) {
      // api: 판매중으로 상태 변경
      this.state = '판매중';
    }

    if (target.closest('.button-reserved')) {
      // api: 예약중으로 상태 변경
      this.state = '예약중';
    }

    if (target.closest('.button-soldout')) {
      // api: 판매완료로 상태 변경
      this.state = '판매완료';
    }

    this.render();
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
    const { name, category, uploadTime, description, chatCount, likeCount, watchCount, userId, town } = this.product;
    const passedTime = getPassedTime(uploadTime);
    const info = createElement({ tagName: 'div', classNames: ['product-detail-content'] });
    info.innerHTML = `
    <span class="name">${name}</span>
    <span class="text-small">${category} ∙ ${passedTime}</span>
    <pre class="description">${description}</pre>
    <span class="text-small">채팅 ${chatCount} ∙ 관심 ${likeCount} ∙ 조회 ${watchCount}</span>
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
