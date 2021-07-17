import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import { createElement } from '../../utils/dom.js';
import MainTopBar from '../../components/MainTopBar';
import ProductList from '../../components/ProductList';

export default class HomePage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.setPageState = setState(pageState);

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const topBar = new MainTopBar();
    const productList = new ProductList();
    this.$target.innerHTML = '';
    this.$target.appendChild(topBar.$target);
    this.$target.appendChild(productList.$target);
  }
}
