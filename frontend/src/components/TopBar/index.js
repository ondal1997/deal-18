import './style.scss';
import categoryIcon from '../../../public/assets/homepage/category.svg';
import locationIcon from '../../../public/assets/homepage/location.svg';
import userIcon from '../../../public/assets/homepage/user.svg';
import menuIcon from '../../../public/assets/homepage/menu.svg';

import { getState, setState } from '../../utils/globalObserver';
import { createElement } from '../../utils/dom';
import { locationDropdownState } from '../../store/store';
import DropdownModal from '../Common/Modal';

//pages
import LocationDropdown from '../Dropdown/LocationDropdown';

export default class TopBar {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['top-bar', 'top-bar-main'] });
    this.init();
    this.setModalIsOpen = setState(locationDropdownState);
  }
  init() {
    this.render();
    this.addEvent();
  }

  addEvent() {
    document.body.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    this.$target.innerHTML = `
    <div class="category">
      <img src=${categoryIcon}>
    </div>
    <div class="location">
      <img src=${locationIcon}>
      <span>역삼동<span>
    </div>
    <div class='user-main-wrapper'>
      <div class='user'><img src=${userIcon}></div>
      <div class='menu'><img src=${menuIcon}></div>
    </div>
    `;

    const locationDropdown = this.createLocationDropdown();
    //TODO 어떻게 개선할 수 없을까
    //조금 이상하다. 하지만 이렇게 해야지 absolute 위치 선정이 크기가 변동해도 일정할 것 같아서 이렇게 했다.
    this.$target.querySelector('.location').appendChild(locationDropdown);
  }

  handleClick({ target }) {
    if (this.isTopBar(target)) {
      this.setModalIsOpen(false);
      return;
    }

    if (this.isLocationBtn(target)) this.toggleLocationModal();
    else this.setModalIsOpen(false);
  }

  createLocationDropdown() {
    const locationDropdown = new DropdownModal({
      View: LocationDropdown,
      className: 'location-dropdown',
      key: locationDropdownState,
    });

    return locationDropdown.$target;
  }

  toggleLocationModal() {
    const isOpen = getState(locationDropdownState);
    this.setModalIsOpen(!isOpen);
  }

  //handleClick 조건
  isTopBar(target) {
    return !target.closest('.top-bar-main');
  }
  isLocationBtn(target) {
    return target.closest('.location') && !target.closest('.location-dropdown');
  }
}
