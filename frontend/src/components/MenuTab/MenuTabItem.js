import { createElement } from '../../utils/dom';
import { setState } from '../../utils/globalObserver';
import { menuTabState } from '../../store/menuPage';

export default class MenuTabItem {
  constructor({ value, type, isSelected }) {
    this.$target = createElement({ tagName: 'div', classNames: ['menu-tab-item'], value });
    this.setMenuTab = setState(menuTabState);

    this.isSelected = isSelected;
    this.type = type;
    this.init();
  }

  init() {
    this.selectMenuItem();
    this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  selectMenuItem() {
    if (this.isSelected) this.$target.classList.add('selected-menu-tab-item');
  }

  handleClick() {
    this.setMenuTab({ type: this.type });
  }
}
