import { subscribe, getState } from './utils/globalObserver.js';
import { pageState } from './store/page.js';
import { createElement } from './utils/dom.js';

export default class App {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page-container'] });
    this.PAGE_TRANSITION = 'all 0.4s';
    this.PAGE_WIDTH = 320; // TODO: 이 필드를 없앨 수 없나?
    this.isProcessing = false;

    this.init();
  }

  init() {
    subscribe(pageState, 'App', this.render.bind(this));
    this.$target.addEventListener('transitionend', this.handleTransitionEnd.bind(this));

    const { Page } = getState(pageState);
    const pageWrapper = createElement({ tagName: 'div', classNames: ['page-wrapper'] });
    pageWrapper.appendChild(new Page().$target);
    this.$target.appendChild(pageWrapper);
  }

  render() {
    if (this.isProcessing) return;

    const { Page, direction } = getState(pageState);

    this.movePage({ Page, direction });
  }

  handleTransitionEnd({ target }) {
    if (target == this.$target) {
      this.endTransition();
    }
  }

  movePage({ Page, direction }) {
    this.insertPage({ direction, Page });
    this.startTransition({ direction });
  }

  insertPage({ Page, direction }) {
    const pageWrapper = createElement({ tagName: 'div', classNames: ['page-wrapper'] });
    pageWrapper.style.position = 'absolute';
    pageWrapper.style[direction] = `-${this.PAGE_WIDTH}px`;
    pageWrapper.style.top = '0px';
    pageWrapper.appendChild(new Page().$target);
    this.$target.appendChild(pageWrapper);
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
