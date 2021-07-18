import './style.scss';
import { createElement } from '../../utils/dom';
import { menuTabState } from '../../store/menuPage';
import { getState } from '../../utils/globalObserver';
import MenuTabItem from './MenuTabItem';

export default class MenuTab {
  constructor() {
    this.TAB_LIST = [
      { value: '판매목록', type: 'sell' },
      { value: '채팅', type: 'chat' },
      { value: '관심목록', type: 'like' },
    ];

    this.$target = createElement({ tagName: 'div', classNames: ['menu-tab'] });

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const { type: selectedType } = getState(menuTabState);

    this.TAB_LIST.forEach(({ value, type }) => {
      const isSelected = type === selectedType;
      const tabItem = new MenuTabItem({ value, type, isSelected }).$target;
      this.$target.appendChild(tabItem);
    });
  }
}
