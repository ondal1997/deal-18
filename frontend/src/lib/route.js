import { setState } from '../utils/globalObserver';

export default class Router {
  constructor({ routes, pageState }) {
    this.routes = routes;
    this.setPage = setState(pageState);
    this.currIndex = 0;

    this.init();
  }

  init() {
    history.replaceState({ index: 0 }, '');
    window.addEventListener('popstate', this.handlePopstate.bind(this));
  }

  // 브라우저 뒤로, 앞으로가기
  handlePopstate() {
    const path = location.pathname;
    const Page = this.routes[path];

    // TODO: 파라메타 파싱
    // /items/:itemsId/edit
    // /items/30/edit
    // params = { itemsId: 30 }
    // parsing

    this.setPage({ Page, direction: this.isBack(history.state.index) ? 'left' : 'right' });
    this.currIndex = history.state.index;
  }

  // 화면 앞으로가기
  push(pathname) {
    history.pushState({ index: this.currIndex + 1 }, '', pathname);
    this.handlePopstate();
  }

  // 화면 뒤로가기
  pop() {
    if (!this.currIndex) return; //페이지 이동 처리
    history.back();
  }
  //카 홈 카 카
  //TODO 쿼리 search 처리
  parse(pathname) {
    //파싱하는 함수
  }

  isBack(index) {
    return index < this.currIndex;
  }
}
