import './style.scss';
import { getState, setState } from '../../utils/globalObserver';
import { createElement } from '../../utils/dom';
import { pageState } from '../../store/page';
import { locationDropdownState } from '../../store/store';
import { router } from '../..';
import { userState } from '../../store/user';

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
    const { primaryTown, towns } = getState(userState);

    const townHTML = towns.reduce((acc, town) => acc + this.renderLocation({ primaryTown, town }), '');

    this.$target.innerHTML = `
        ${townHTML}
        <div class="location-dropdown-item move-edit-page">내 동네 설정하기</div>
    `;
  }
  renderLocation({ primaryTown, town }) {
    const isPrimary = primaryTown === town;
    return `<div class="location-dropdown-item ${isPrimary ? 'primary-location' : ''}>${town}</div>`;
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
