import { createElement } from '../../utils/dom';
import { setState, subscribe } from '../../utils/globalObserver';
import locationAddBtn from '../../../public/assets/locationPage/locationAddBtn.svg';
import locationDeleteBtn from '../../../public/assets/locationPage/locationDeleteBtn.svg';
import { fetchDeleteTown, fetchPutPrimaryTown } from '../../API/townAPI';
import { locationInputPopupState } from '../../store/store';
import { userState } from '../../store/user';

export default class LocationItem {
  constructor({ town, isPrimary }) {
    this.$target = createElement({ tagName: 'div', classNames: ['location-item-wrapper'] });
    this.town = town;
    this.isAddBtn = town === null;
    this.isPrimary = isPrimary;

    this.setUserState = setState(userState);
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
              : `<div>${this.town}</div>
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

    this.changePrimary();
  }

  isDeleteBtn(target) {
    return target.closest('.delete-btn');
  }

  deleteLocation() {
    fetchDeleteTown({ town: this.town })
      .then((res) => {
        this.setUserState((data) => ({ ...data, towns: res.towns }));
      })
      .catch(console.error); //TODO
  }

  changePrimary() {
    fetchPutPrimaryTown({ town: this.town })
      .then((res) => {
        this.setUserState((data) => ({ ...data, primaryTown: res.primaryTown }));
      })
      .catch(console.error); //TODO
  }

  getLocationItemClass() {
    if (this.isAddBtn) return 'location-item location-add-btn';

    if (this.isPrimary) return 'location-item location-selected-item';
    return 'location-item';
  }
}
