import './style.scss';
import { createElement } from '../../utils/dom';
import FormImgList from './FormImgList';
import FormTitleNCategory from './FormTitleNCategory';

export default class PostProductForm {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['post-product-form'] });
    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const formImgList = new FormImgList().$target;
    const formTitleNCategory = new FormTitleNCategory().$target;

    this.$target.appendChild(formImgList);
    this.$target.appendChild(formTitleNCategory);
  }
}
