import './style.scss';
import TopBar from '../../components/Common/CommonTopBar';
import { createElement } from '../../utils/dom';

export default class Postpage {
  constructor() {
    this.PAGE_TITLE = '글쓰기';

    this.$target = createElement({ tagName: 'div', classNames: ['page', 'post-page'] });
    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const topBar = new TopBar({ title: this.PAGE_TITLE, className: 'post-page-topbar' }).$target;

    this.$target.appendChild(topBar);
  }
}
