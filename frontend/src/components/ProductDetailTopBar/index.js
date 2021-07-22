import './style.scss';
import { createElement } from '../../utils/dom';
import backBtn from '../../../public/assets/product/chevron-left.svg';
import moreBtn from '../../../public/assets/product/more.svg';
import { router } from '../../index';
import { fetchDeleteProduct } from '../../api/productAPI';

export default class ProductDetailTopBar {
  constructor({ product }) {
    this.$target = createElement({ tagName: 'div', classNames: ['product-detail-top-bar'] });
    this.product = product;

    this.isOpen = false;

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

    if (target.closest('.button-toggle-dropdown')) {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        const handleMousedown = ({ target }) => {
          if (target.closest('.product-detail-top-bar') === this.$target && target.closest('.dropdown-wrapper')) {
            return;
          }

          document.removeEventListener('mousedown', handleMousedown);
          this.isOpen = false;
          this.render();
        };

        document.addEventListener('mousedown', handleMousedown);
      }
    }

    if (target.closest('.edit')) {
      router.push(`/products/${this.product.id}/edit`);
    }

    if (target.closest('.remove')) {
      this.handleClickDeleteProduct();
    }

    this.render();
  }

  handleClickDeleteProduct() {
    fetchDeleteProduct(this.product.id)
      .then(() => {
        router.replace('/');
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    let html = `
      <div class='back-btn'>
        <img src=${backBtn} alt='go back'/>
      </div>
    `;

    if (this.product.isYours) {
      html += `
        <div>
          <div>
            <img class='button-toggle-dropdown' src=${moreBtn} alt='more'/>
          </div>
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
      `;
    }

    this.$target.innerHTML = html;
  }
}
