import { createElement } from '../../../utils/dom';
import { getState, setState, subscribe } from '../../../utils/globalObserver';

export default class Modal {
  constructor({ View, className, key }) {
    this.$target = createElement({ tagName: 'div', classNames: [className] });
    this.View = new View({ key }).$target; //상태에 따라 변경되는 사항이 없기 때문에 생성자에서 인스턴스 생성
    this.key = key;
    this.setIsOpen = setState(key);

    this.init();
  }
  init() {
    subscribe(this.key, this.toggleModal.bind(this));
    this.render();
    // this.$target.style.display = 'none';
  }

  render() {
    this.$target.appendChild(this.View);
  }

  toggleModal() {
    const isOpen = getState(this.key);
    this.$target.style.display = isOpen ? 'block' : 'none';
  }
}

/**
 * 공용으로 사용하기 위한 모달
 *
 * 사용할 클래스를 View로 받아서 render 해준다.
 *
 *
 * 또한 위치 역시 다르기 때문에 각 호출해주는 부분에서 class를 넘겨주어서 그것으로 위치를 컨트롤 하는 것이 좋아 보인다.
 *
 * 모달의 open 상태를 관리해야된다.
 * 상위 컴포넌트에서 initState로 key를 만들어서 전달해주고 이를 활용해 state,setState를 활용한다.
 *
 * subscribe는
 */
