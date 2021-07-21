import './style.scss';
import CommonTopBar from '../../components/Common/CommonTopBar';
import { createElement } from '../../utils/dom';
import PostProductForm from '../../components/PostProductForm';
import locationIcon from '../../../public/assets/postPage/locationIcon.svg';

export default class Postpage {
  constructor() {
    this.PAGE_TITLE = '글쓰기';

    this.$target = createElement({ tagName: 'div', classNames: ['page', 'post-page'] });
    this.$postLocation = createElement({ tagName: 'div', classNames: ['post-location'] });

    this.inputInfo = {
      title: '',
      price: '',
      description: '',
    };

    this.mount();
  }
  mount() {
    this.renderLocation();
    this.render();
  }
  render() {
    const topBar = new CommonTopBar({ title: this.PAGE_TITLE, className: 'post-page-topbar' }).$target;
    const postProductForm = new PostProductForm({
      inputInfo: this.inputInfo,
      setInputInfo: this.setInputInfo.bind(this),
    }).$target;

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
  setInputInfo({ title, price, description }) {
    if (title) this.inputInfo = { ...this.inputInfo, title };
    if (price) this.inputInfo = { ...this.inputInfo, price };
    if (description) this.inputInfo = { ...this.inputInfo, description };
  }
}
