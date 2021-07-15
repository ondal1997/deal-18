import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import CategoryPage from '../CategoryPage';

export default class HomePage {
  constructor() {
    this.$target = document.createElement('div');
    this.setPageState = setState(pageState);
    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  handleClick({ target }) {
    if (!target.classList.contains('move-page')) return;

    this.setPageState({ Page: CategoryPage, direction: 'left' });
  }

  render() {
    this.$target.innerHTML = `
      <h1>우아마켓</h1>
      <button class="move-page">카테고리 이동</button>
    `;
  }
}
