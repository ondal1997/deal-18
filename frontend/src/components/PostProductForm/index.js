import './style.scss';
import { createElement } from '../../utils/dom';
import FormImgList from './FormImgList';
import FormTitleNCategory from './FormTitleNCategory';

export default class PostProductForm {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['post-product-form'] });
    this.$formPrice = createElement({ tagName: 'div', classNames: ['form-price'] });
    this.$formDescription = createElement({ tagName: 'div', classNames: ['form-description'] });
    this.init();
  }
  init() {
    this.renderPrice();
    this.renderDescription();

    this.render();
    this.addEvent();
  }

  addEvent() {
    this.$formDescription.addEventListener('input', this.handleInput.bind(this));
  }

  render() {
    const formImgList = new FormImgList().$target;
    const formTitleNCategory = new FormTitleNCategory().$target;

    this.$target.appendChild(formImgList);
    this.$target.appendChild(formTitleNCategory);
    this.$target.appendChild(this.$formPrice);
    this.$target.appendChild(this.$formDescription);
  }

  renderPrice() {
    this.$formPrice.innerHTML = `
        <input type='number' placeholder='₩ 가격(선택사항)' />
        `;
  }
  renderDescription() {
    this.$formDescription.innerHTML = `
        <textarea placeholder='게시글 내용을 작성해주세요.'></textarea>
    `;
  }

  handleInput({ target }) {
    target.style.height = target.scrollHeight + 'px';
  }
}
