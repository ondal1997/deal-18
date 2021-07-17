import './style.scss';
import { setState } from '../../utils/globalObserver';
import { createElement } from '../../utils/dom';
import { pageState } from '../../store/page';
import { locationDropdownState } from '../../store/store';
import { router } from '../..';

export default class LocationDropdown {
  constructor({ key }) {
    this.$target = createElement({ tagName: 'div', classNames: ['dropdown', 'location-dropdown-wrapper'] });
    this.key = key;
    this.setIsOpen = setState(locationDropdownState);
    this.setPage = setState(pageState);
    this.init();
  }

  init() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  render() {
    this.$target.innerHTML = `
        <div class="location-dropdown-item select-location">역삼동</div>
        <div class="location-dropdown-item move-edit-page">내 동네 설정하기</div>
    `;
  }

  handleClick({ target }) {
    if (target.closest('.select-location')) this.setIsOpen(false);

    if (target.closest('.move-edit-page')) router.push('/location');
  }

  toggleLocationModal() {
    const isOpen = getState(locationDropdownState);
    this.setIsOpen(!isOpen);
  }
}
