import { createElement } from '../../utils/dom';
import { setState, subscribe } from '../../utils/globalObserver';
import locationAddBtn from '../../../public/assets/locationPage/locationAddBtn.svg';
import locationDeleteBtn from '../../../public/assets/locationPage/locationDeleteBtn.svg';
import { locationInputPopupState } from '../../store/store';
import { locationState } from '../../store/townPage';
import { fetchDeleteLocations } from '../../API/locationAPI';

export default class LocationItem {
  constructor({ location, isPrimary }) {
    this.$target = createElement({ tagName: 'div', classNames: ['location-item-wrapper'] });
    this.location = location;
    this.isAddBtn = location === null;
    this.isPrimary = isPrimary;

    this.setLocationState = setState(locationState);
    this.setInputPopupOpen = setState(locationInputPopupState);
    this.init();
  }

  init() {
    this.render();
    this.addEvent();
  }

  addEvent() {
    subscribe(locationState, 'LocationItem', this.render.bind(this));
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    const locationClassName = this.getLocationItemClass();

    this.$target.innerHTML = `
        <div class="${locationClassName}">
          ${
            this.isAddBtn
              ? `<img src=${locationAddBtn} alt='동네 등록하기' />`
              : `<div>${this.location}</div>
                 <img class='delete-btn' src=${locationDeleteBtn} alt='동네 삭제하기' />`
          }
        </div>
    `;
  }

  handleClick({ target }) {
    if (this.isAddBtn) {
      this.setInputPopupOpen(true);
      return;
    }

    if (this.isDeleteBtn(target)) {
      this.deleteLocation();
      return;
    }

    //TODO 대표동네 변경
    //setState
  }

  isDeleteBtn(target) {
    return target.closest('.delete-btn');
  }

  deleteLocation() {
    fetchDeleteLocations({ town: this.location })
      .then((res) => {
        this.setLocationState((data) => ({ ...data, locations: res.towns }));
      })
      .catch(alert); //TODO
  }

  getLocationItemClass() {
    if (this.isAddBtn) return 'location-item location-add-btn';

    if (this.isPrimary) return 'location-item location-selected-item';
    return 'location-item';
  }
}
