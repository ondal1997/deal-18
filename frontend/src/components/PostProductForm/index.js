import './style.scss';
import { createElement } from '../../utils/dom';
import FormImgList from './FormImgList';

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

    this.$target.appendChild(formImgList);
  }
}
