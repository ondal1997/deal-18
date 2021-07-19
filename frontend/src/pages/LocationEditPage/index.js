import './style.scss';
import { createElement } from '../../utils/dom';
import { locationInputPopupState } from '../../store/store';
import CommonTopBar from '../../components/Common/CommonTopBar';
import LocationList from '../../components/LocationList';
import Modal from '../../components/Common/Modal';
import LocationInputPopup from '../../components/Popup/LocationInputPopup';

export default class LocationEditPage {
  constructor() {
    this.PAGE_TITLE = '내 동네 설정하기';
    this.CAUTION_LINE1 = '지역은 최소 1개 이상';
    this.CAUTION_LINE2 = '최대 2개까지 설정 가능해요.';

    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.$cautionMsg = createElement({ tagName: 'div', classNames: ['location-cautions'] });

    this.init();
  }

  init() {
    this.renderCautionMsg();
    this.render();
  }

  render() {
    const topBar = new CommonTopBar({ title: this.PAGE_TITLE }).$target;
    const locationList = new LocationList().$target;

    const locationInputPopup = new Modal({
      View: LocationInputPopup,
      className: 'location-input-modal',
      key: locationInputPopupState,
    }).$target;

    this.$target.appendChild(topBar);
    this.$target.appendChild(this.$cautionMsg);
    this.$target.appendChild(locationList);
    this.$target.appendChild(locationInputPopup);
  }

  renderCautionMsg() {
    this.$cautionMsg.innerHTML = `
      <div>${this.CAUTION_LINE1}</div>
      <div>${this.CAUTION_LINE2}</div>
    `;
  }
}
