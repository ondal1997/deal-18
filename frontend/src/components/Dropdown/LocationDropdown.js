import './style.scss';
import { getState, setState } from '../../utils/globalObserver';
import { createElement } from '../../utils/dom';
import { pageState } from '../../store/page';
import { locationDropdownState } from '../../store/store';
import { router } from '../..';
import { fetchPutPrimaryTown } from '../../API/townAPI';
import { userState } from '../../store/user';

export default class LocationDropdown {
  constructor({ key }) {
    this.$target = createElement({ tagName: 'div', classNames: ['dropdown', 'location-dropdown-wrapper'] });
    this.key = key;
    this.setIsOpen = setState(locationDropdownState);
    this.setPage = setState(pageState);
    this.setUserState = setState(userState);
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
    return `<div class="location-dropdown-item ${isPrimary ? 'primary-location' : ''}">${town}</div>`;
  }

  handleClick({ target }) {
    if (target.closest('.primary-location')) {
      this.setIsOpen(false);
      return;
    }

    if (target.closest('.move-edit-page')) {
      if (!getState(userState).userId) {
        alert('로그인이 필요합니다.');
        return;
      }

      router.push('/location');
      return;
    }

    if (target.closest('.location-dropdown-item')) {
      this.changePrimary(target.textContent);
    }
  }

  toggleLocationModal() {
    const isOpen = getState(locationDropdownState);
    this.setIsOpen(!isOpen);
  }

  changePrimary(town) {
    fetchPutPrimaryTown({ town })
      .then((res) => {
        console.log(res);
        this.setUserState((data) => ({ ...data, primaryTown: res.primaryTown }));
      })
      .catch(alert); //TODO
  }
}
