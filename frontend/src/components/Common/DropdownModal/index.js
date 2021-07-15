import './style.scss';
import { createElement } from '../../../utils/dom';
import { getState, setState, subscribe } from '../../../utils/globalObserver';

export default class DropdownModal {
  constructor({ contents, className, key }) {
    this.$target = createElement({ tagName: 'div', classNames: ['dropdown-modal', className] });
    this.contents = contents;
    this.key = key;
    this.setIsOpen = setState(key);

    this.init();
  }
  init() {
    subscribe(this.key, this.toggleModal.bind(this));
    this.render();
  }
  render() {
    this.contents.forEach(({ value, clickCb }) => {
      const $item = createElement({ tagName: 'div', classNames: ['dropdown-item'], value });
      $item.addEventListener('click', clickCb);
      this.$target.appendChild($item);
    });
  }

  toggleModal() {
    const isOpen = getState(this.key);
    this.$target.style.display = isOpen ? 'block' : 'none';
  }

  handleClick({ target }) {
    if (target.closest('dropdown-modal')) return;
    this.setIsOpen(false);
  }
}

/**
 * 공용으로 사용하기 위한 dropdown 모달
 *
 * 각 칸마다 하는 역할 (콜백함수)가 다르기 때문에 인자로 받아야 된다.
 *
 * [{value:'역삼동',handleClick:함수}]
 * 위와 같은 형태로 받으면 될 것 같다.
 *
 * 또한 위치 역시 다르기 때문에 각 호출해주는 부분에서 class를 넘겨주어서 그것으로 위치를 컨트롤 하는 것이 좋아 보인다.
 *
 * 모달의 open 상태를 관리해야된다.
 *
 * 상위 컴포넌트에서 initState로 key를 만들어서 전달해주고 이를 활용해 state,setState를 활용한다.
 */
