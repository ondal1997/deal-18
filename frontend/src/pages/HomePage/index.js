import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import CategoryPage from '../CategoryPage';
import LoginPage from '../LoginPage';
import LogoutPage from '../LogoutPage';
import { createElement } from '../../utils/dom.js';
import TopBar from '../../components/TopBar';
import ProductList from '../../components/ProductList';

export default class HomePage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.setPageState = setState(pageState);

    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  handleClick({ target }) {
    if (target.closest('.category')) {
      this.setPageState({ Page: CategoryPage, direction: 'right' });
    }

    if (target.closest('.user')) {
      this.setPageState({ Page: LogoutPage, direction: 'right' });
    }
  }

  render() {
    const topBar = new TopBar();
    const productList = new ProductList();
    this.$target.innerHTML = '';
    this.$target.appendChild(topBar.$target);
    this.$target.appendChild(productList.$target);
  }
}
