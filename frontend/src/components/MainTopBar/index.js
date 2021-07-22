import './style.scss';
import categoryIcon from '../../../public/assets/homepage/category.svg';
import locationIcon from '../../../public/assets/homepage/location.svg';
import userIcon from '../../../public/assets/homepage/user.svg';
import menuIcon from '../../../public/assets/homepage/menu.svg';

import { router } from '../../index';
import { getState, setState, subscribe } from '../../utils/globalObserver';
import { createElement } from '../../utils/dom';
import { locationDropdownState } from '../../store/store';
import Modal from '../Common/Modal';

//pages
import LocationDropdown from '../Dropdown/LocationDropdown';
import { userState } from '../../store/user';

export default class MainTopBar {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['top-bar', 'top-bar-main'] });

    this.setModalIsOpen = setState(locationDropdownState);
    this.locationDropdown = this.createLocationDropdown();

    this.userId = getState(userState).userId;

    this.init();
  }
  init() {
    subscribe(userState, 'MainTopBar', this.render.bind(this));
    this.render();
    this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    const { primaryTown } = getState(userState);
    this.$target.innerHTML = `
    <div>
      <img src=${categoryIcon} class="category">
    </div>
    <div class="location">
      <img src=${locationIcon}>
      <span>${primaryTown}<span>
    </div>
    <div class='user-main-wrapper'>
      <div class='user'><img src=${userIcon}></div>
      <div class='menu'><img src=${menuIcon}></div>
    </div>
    `;

    //TODO 어떻게 개선할 수 없을까
    //조금 이상하다. 하지만 이렇게 해야지 absolute 위치 선정이 크기가 변동해도 일정할 것 같아서 이렇게 했다.
    this.$target.querySelector('.location').appendChild(this.locationDropdown);
  }

  handleClick({ target }) {
    if (this.isTopBar(target)) {
      this.setModalIsOpen(false);
      return;
    }

    if (target.closest('.category')) {
      router.push('/categories');
    }

    if (target.closest('.user')) {
      if (!this.userId) {
        router.push('/login');
      } else {
        router.push('/me');
      }
    }

    if (target.closest('.menu')) {
      router.push('/menu');
    }

    if (this.isLocationBtn(target)) this.toggleLocationModal();
    else this.setModalIsOpen(false);
  }

  createLocationDropdown() {
    const locationDropdown = new Modal({
      View: LocationDropdown,
      className: 'location-dropdown',
      key: locationDropdownState,
    });

    return locationDropdown.$target;
  }

  toggleLocationModal() {
    const isOpen = getState(locationDropdownState);
    this.setModalIsOpen(!isOpen);

    const handleMousedown = ({ target }) => {
      if (!target.closest('.location') && target.closest('.location-dropdown') !== this.locationDropdown) {
        document.removeEventListener('mousedown', handleMousedown);
        this.setModalIsOpen(false);
      }
    };
    if (!isOpen) {
      document.addEventListener('mousedown', handleMousedown);
    }
  }

  //handleClick 조건
  isTopBar(target) {
    return !target.closest('.top-bar-main');
  }
  isLocationBtn(target) {
    return target.closest('.location') && !target.closest('.location-dropdown');
  }
}
