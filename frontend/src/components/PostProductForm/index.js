import './style.scss';
import { createElement } from '../../utils/dom';
import FormImgList from './FormImgList';
import FormTitleNCategory from './FormTitleNCategory';

export default class PostProductForm {
  constructor({ inputInfo, setInputInfo, setIsAbleSubmit }) {
    this.$target = createElement({ tagName: 'div', classNames: ['post-product-form'] });
    this.$formPrice = createElement({ tagName: 'div', classNames: ['form-price'] });
    this.$formDescription = createElement({ tagName: 'div', classNames: ['form-description'] });

    this.inputInfo = inputInfo;
    this.setInputInfo = setInputInfo;
    this.setIsAbleSubmit = setIsAbleSubmit;

    this.mount();
    this.addEvent();
  }
  mount() {
    this.renderPrice();
    this.renderDescription();

    this.render();
  }

  addEvent() {
    this.$formPrice.addEventListener('input', this.handleInputPrice.bind(this));
    this.$formDescription.addEventListener('input', this.handleInputDescription.bind(this));
  }

  render() {
    const formImgList = new FormImgList({ setIsAbleSubmit: this.setIsAbleSubmit }).$target;
    const formTitleNCategory = new FormTitleNCategory({
      inputInfo: this.inputInfo,
      setInputInfo: this.setInputInfo,
      setIsAbleSubmit: this.setIsAbleSubmit,
    }).$target;

    this.$target.appendChild(formImgList);
    this.$target.appendChild(formTitleNCategory);
    this.$target.appendChild(this.$formPrice);
    this.$target.appendChild(this.$formDescription);
  }

  renderPrice() {
    this.$formPrice.innerHTML = `
        <input type='number' placeholder='₩ 가격(선택사항)' value='${this.inputInfo.price}' />
        `;
  }
  renderDescription() {
    this.$formDescription.innerHTML = `
        <textarea placeholder='게시글 내용을 작성해주세요.'>${this.inputInfo.description}</textarea>
    `;
  }

  handleInputPrice({ target }) {
    this.setInputInfo({ price: target.value });
  }

  handleInputDescription({ target }) {
    target.style.height = target.scrollHeight + 'px';
    this.setInputInfo({ description: target.value });
    this.setIsAbleSubmit();
  }
}
