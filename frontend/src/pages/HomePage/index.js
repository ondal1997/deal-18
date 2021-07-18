import './style.scss';
import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import { createElement } from '../../utils/dom.js';
import MainTopBar from '../../components/MainTopBar';
import ProductList from '../../components/ProductList';
import postButton from '../../../public/assets/homepage/postButton.svg';

export default class HomePage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page', 'home-page'] });
    this.$postBtn = createElement({ tagName: 'div', classNames: ['post-btn'] });
    this.setPageState = setState(pageState);

    this.init();
  }

  init() {
    this.renderPostBtn();
    this.render();
  }

  render() {
    const topBar = new MainTopBar();
    const productList = new ProductList();
    this.$target.innerHTML = '';
    this.$target.appendChild(topBar.$target);
    this.$target.appendChild(productList.$target);
    this.$target.appendChild(this.$postBtn);
  }

  renderPostBtn() {
    this.$postBtn.innerHTML = `
      <img src=${postButton} alt ='상품 등록하기 버튼' />
    `;
  }
}
