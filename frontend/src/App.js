import { subscribe, getState } from './utils/globalObserver.js';
import { pageState } from './store/page.js';

export default class App {
  constructor() {
    this.$target = document.createElement('div');
    this.PAGE_TRANSITION = 'all 1s';
    this.PAGE_WIDTH = 200; // TODO: 이 필드를 없앨 수 없나?
    this.isProcessing = false;

    this.init();
  }

  init() {
    subscribe(pageState, this.render.bind(this));
    this.$target.addEventListener('transitionend', this.handleTransitionEnd.bind(this));

    const { Page } = getState(pageState);
    this.$target.appendChild(new Page().$target);
  }

  render() {
    if (this.isProcessing) return;

    const { Page, direction } = getState(pageState);

    this.movePage({ Page, direction });
  }

  handleTransitionEnd() {
    this.endTransition();
  }

  movePage({ Page, direction }) {
    this.insertPage({ direction, Page });
    this.startTransition({ direction });
  }

  insertPage({ Page, direction }) {
    const newPage = new Page().$target;
    newPage.style.position = 'absolute';
    newPage.style[direction] = `-${this.PAGE_WIDTH}px`;

    this.$target.appendChild(newPage);
  }

  startTransition({ direction }) {
    const MOVE_POSITION = direction === 'left' ? this.PAGE_WIDTH : -this.PAGE_WIDTH;

    this.$target.style.transition = this.PAGE_TRANSITION;
    this.$target.style.transform = `translateX(${MOVE_POSITION}px)`;
    this.isProcessing = true;
  }

  endTransition() {
    this.$target.removeChild(this.$target.firstChild);
    this.$target.firstChild.style.position = 'static';
    this.$target.style.transition = 'none';
    this.$target.style.transform = `translateX(0)`;
    this.isProcessing = false;
  }
}
