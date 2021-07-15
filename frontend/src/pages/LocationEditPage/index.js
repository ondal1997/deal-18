import './style.scss';
import { setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import TopBar from '../../components/Common/CommonTopBar';
import { createElement } from '../../utils/dom';
import LocationList from '../../components/LocationList';

export default class LocationEditPage {
  constructor() {
    this.PAGE_TITLE = '내 동네 설정하기';
    this.CAUTION_LINE1 = '지역은 최소 1개 이상';
    this.CAUTION_LINE2 = '최대 2개까지 설정 가능해요.';

    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.setPageState = setState(pageState);

    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  render() {
    const topBar = new TopBar({ title: this.PAGE_TITLE }).$target;
    const locationList = new LocationList().$target;

    this.$target.appendChild(topBar);
    this.$target.innerHTML += `
        <div class='location-cautions'>
          <div>${this.CAUTION_LINE1}</div>
          <div>${this.CAUTION_LINE2}</div>
        </div>
    `;
    this.$target.appendChild(locationList);
  }

  handleClick() {}
}
