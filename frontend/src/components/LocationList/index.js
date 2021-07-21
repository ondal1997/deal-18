import './style.scss';
import { createElement } from '../../utils/dom';
import LocationItem from './LocationItem';
import { getState } from '../../utils/globalObserver';
import { townState } from '../../store/townPage';

export default class LocationList {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['location-list'] });

    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const { primaryTown, towns } = getState(townState);
    towns.forEach((town) => {
      const isPrimary = primaryTown === town;
      this.$target.appendChild(new LocationItem({ town, isPrimary }).$target);
    });

    if (towns.length < 2) this.$target.appendChild(new LocationItem({ town: null }).$target);
  }
}
