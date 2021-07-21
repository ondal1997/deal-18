import './style.scss';
import { createElement } from '../../utils/dom';
import LocationItem from './LocationItem';
import { getState } from '../../utils/globalObserver';
import { locationState } from '../../store/townPage';

export default class LocationList {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['location-list'] });

    this.init();
  }
  init() {
    this.render();
  }
  render() {
    const { primaryLocation, locations } = getState(locationState);
    locations.forEach((location) => {
      const isPrimary = primaryLocation === location;
      this.$target.appendChild(new LocationItem({ location, isPrimary }).$target);
    });

    if (locations.length < 2) this.$target.appendChild(new LocationItem({ location: null }).$target);
  }
}
