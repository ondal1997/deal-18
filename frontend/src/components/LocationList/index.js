import './style.scss';
import { createElement } from '../../utils/dom';
import LocationItem from './LocationItem';
import { getState, subscribe } from '../../utils/globalObserver';
import { userState } from '../../store/user';

export default class LocationList {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['location-list'] });

    this.init();
  }
  init() {
    subscribe(userState, 'LocationList', this.render.bind(this));
    this.render();
  }
  render() {
    this.$target.innerHTML = '';

    const { primaryTown, towns } = getState(userState);

    towns.forEach((town) => {
      const isPrimary = primaryTown === town;
      this.$target.appendChild(new LocationItem({ town, isPrimary }).$target);
    });

    if (towns.length < 2) this.$target.appendChild(new LocationItem({ town: null }).$target);
  }
}
