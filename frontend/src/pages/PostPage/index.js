import './style.scss';
import TopBar from '../../components/Common/CommonTopBar';
import { createElement } from '../../utils/dom';
import PostProductForm from '../../components/PostProductForm';
import locationIcon from '../../../public/assets/postPage/locationIcon.svg';

export default class Postpage {
  constructor() {
    this.PAGE_TITLE = '글쓰기';

    this.$target = createElement({ tagName: 'div', classNames: ['page', 'post-page'] });
    this.$postLocation = createElement({ tagName: 'div', classNames: ['post-location'] });

    this.init();
  }
  init() {
    this.renderLocation();
    this.render();
  }
  render() {
    const topBar = new TopBar({ title: this.PAGE_TITLE, className: 'post-page-topbar' }).$target;
    const postProductForm = new PostProductForm().$target;

    this.$target.appendChild(topBar);
    this.$target.appendChild(postProductForm);
    this.$target.appendChild(this.$postLocation);
  }
  //TODO 목데이터 위치 수정
  renderLocation() {
    this.$postLocation.innerHTML = `
          <img src=${locationIcon} alt='위치 아이콘' />
          <div>역삼동</div>
        `;
  }
}
