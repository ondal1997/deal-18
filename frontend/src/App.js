import { subscribe, getState } from './utils/globalObserver.js';
import { pageState } from './store/page.js';

export default class App {
  constructor() {
    this.$target = document.createElement('div');
    this.init();
  }

  init() {
    subscribe(pageState, this.render.bind(this));
    this.$target.addEventListener('transitionend', this.handleTransitionEnd.bind(this));

    const { Page } = getState(pageState);
    this.$target.appendChild(new Page().$target);
  }

  render() {
    const { Page, direction } = getState(pageState);

    /*
        1. 왼쪽에 가상의 페이지 생성 (카테고리 페이지)
        2. css로 OOOpx만큼 이동 + transition
    */

    // 뒤에 새로운 페이지 붙이기
    const newPage = new Page().$target;
    this.$target.appendChild(newPage);
    // 2 newPage에 포지션 absolute걸고 포지션 설정하기
    newPage.style.position = 'absolute';
    newPage.style[direction] = '-200px'; // TODO: 매직넘버 지울수없나?
    // 3 이동
    this.setTransition({ isTransition: true, direction });
  }

  handleTransitionEnd() {
    this.$target.removeChild(this.$target.firstChild);
    console.log(this.$target.firstChild);
    this.$target.firstChild.style.position = 'static';
    this.$target.style.transition = 'none';
    this.$target.style.transform = `translateX(0)`;
  }

  //2. transition 추가 & 이동 이름 짓는게 어렵네요 ㅎ므...맞네요 추가에 이동까지 있으니
  setTransition({ isTransition, direction }) {
    this.$target.style.transition = 'all 1s';
    const MOVE_POSITION = direction === 'left' ? 200 : -200;
    this.$target.style.transform = `translateX(${MOVE_POSITION}px)`;
  }

  movePage({ direction, page, isTransition }) {
    this.insertpage({ direction, page });
    this.setTransition(isTransition);
  }
}

// App.js
// TODO: TownPage import 필요
// app.appendChild(new TownPage().$target);

/*
현재 페이지 모델
app에서 스위칭
*/
