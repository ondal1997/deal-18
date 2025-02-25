import './style.scss';
import { createElement } from '../../../utils/dom';
import { getWon } from '../../../utils/convertToString';

export default class ChatProductInfo {
  constructor({ chatProduct }) {
    this.$target = createElement({ tagName: 'div', classNames: ['chat-product-info'] });
    this.chatProduct = chatProduct;

    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const { imgUrl, productName, price, state } = this.chatProduct;

    const won = getWon(price);

    this.$target.innerHTML = `
        <div>
          <img src=${imgUrl} alt='상품 이미지' />
          <div class='chat-product-desc'>
            <div class='chat-product-name'>${productName}</div>
            <div class='chat-product-price'>${won}</div>
          </div>
        </div>
        <div class='chat-statue-badge ${state !== '판매완료' ? '' : 'sold-badge'}'>${state}</div>
    `;
  }
}

/*
type chatProduct = {
    imgUrl:string;
    productName:string;
    price:number;
    isSelling: boolean  (true-판매중 , false-판매완료)
}

*/
