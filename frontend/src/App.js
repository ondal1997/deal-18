import PageModel from './models/PageModel';

import Home from './pages/Home';
import Category from './pages/Category';

export default class App {
  constructor() {
    this.$target = document.createElement('div');

    this.pageModel = new PageModel();

    this.homePage = new Home();
    this.categoryPage = new Category();

    this.init();
  }

  init() {
    this.pageModel.subscribe(this.render);
    this.$target.addEventListener('transitionend', this.handleTransitionEnd);
    this.render();
  }

  render({ page, direction }) {
    /*
        1. 왼쪽에 가상의 페이지 생성 (카테고리 페이지)
        2. css로 OOOpx만큼 이동 + transition
    */
    this.$target.appendChild(this.homePage.$target);
  }

  /**
   * @param
   */
  handleTransitionEnd() {
    /**
     * [[홈]]
     * <-
     * [홈] [[카테고리]]
     * <
     *[홈] [[카테고리]]
     *
     * const page = this.pageModel.getPage();
     * $target.innerHTML = ''
     * $target.ppendChild(page)
     */
  }

  //1번
  insertpage({ direction, page }) {
    direction === 'left' ? this.$target.insertBefore(page, this.$target.firstChild) : this.$target.appendChild(page);
    //이렇게 쓰는게 맞나요
  }
  //2. transition 추가 & 이동 이름 짓는게 어렵네요 ㅎ므...맞네요 추가에 이동까지 있으니

  setTransition({ isTransition, direction }) {
    $target.style.transition = isTransition ? 'all 1s' : 'none';
    const MOVE_POSITION = direction === 'left' ? 100 : -100;
    this.$target.style.transform = isTransition ? `translate2d(${MOVE_POSITION}px,0)` : `translate2d(0,0)`;
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
