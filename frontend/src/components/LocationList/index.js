import './style.scss';
import { createElement } from '../../utils/dom';
import LocationItem from './LocationItem';

export default class LocationList {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['location-list'] });

    this.init();
  }
  init() {
    this.render();
  }
  render() {
    locations.forEach((location) => {
      this.$target.appendChild(new LocationItem({ location }).$target);
    });

    if (locations.length < 2) this.$target.appendChild(new LocationItem({ location: null }).$target);
  }
}

const locations = [
  { location: '역삼동', selected: true },
  { location: '역삼동', selected: false },
];
