import { createElement } from '../../utils/dom';
import locationAddBtn from '../../../public/assets/locationPage/locationAddBtn.svg';
import locationDeleteBtn from '../../../public/assets/locationPage/locationDeleteBtn.svg';
import { setState } from '../../utils/globalObserver';
import { locationInputPopupState } from '../../store/store';

export default class LocationItem {
  constructor({ location }) {
    this.$target = createElement({ tagName: 'div', classNames: ['location-item-wrapper'] });
    this.location = location;
    this.isAddBtn = location === null;
    this.setInputPopupOpen = setState(locationInputPopupState);
    this.init();
  }

  init() {
    this.render();
    this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    const locationClassName = this.getLocationItemClass();

    this.$target.innerHTML = `
        <div class="${locationClassName}">
          ${
            this.isAddBtn
              ? `<img src=${locationAddBtn} alt='동네 등록하기' />`
              : `<div>${this.location.location}</div>
                 <img src=${locationDeleteBtn} alt='동네 삭제하기' />`
          }
        </div>
    `;
  }

  handleClick({ target }) {
    if (this.isAddBtn) this.setInputPopupOpen(true);
  }

  getLocationItemClass() {
    if (this.isAddBtn) return 'location-item location-add-btn';

    const { selected } = this.location;
    if (selected) return 'location-item location-selected-item';
    return 'location-item';
  }
}
