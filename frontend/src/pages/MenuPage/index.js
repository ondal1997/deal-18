import TopBar from '../../components/Common/CommonTopBar';
import MenuTab from '../../components/MenuTab';
import ProductList from '../../components/ProductList';
import { menuTabState } from '../../store/menuPage';
import { createElement } from '../../utils/dom';
import { getState, subscribe } from '../../utils/globalObserver';

export default class MenuPage {
  constructor() {
    this.PAGE_TITLE = '메뉴';
    //API에 맞게 이름 변경
    this.SELL = 'sell';
    this.CHAT = 'chat';
    this.LIKE = 'like';

    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.init();
  }
  init() {
    subscribe(menuTabState, this.render.bind(this));
    this.render();
  }
  render() {
    this.$target.innerHTML = '';

    const topBar = new TopBar({ title: this.PAGE_TITLE }).$target;
    const menuTab = new MenuTab().$target;
    const contents = this.getMenuContents();

    this.$target.appendChild(topBar);
    this.$target.appendChild(menuTab);
    this.$target.appendChild(contents);
  }

  getMenuContents() {
    const { type } = getState(menuTabState);
    console.log(type === this.CHAT);
    //promise로 서버에서 데이터 받아올 곳
    switch (type) {
      case this.SELL:
        //TODO 없을 때 메세지 컴포넌트
        if (!products.length) return;
        return new ProductList({ products, isMyProductList: true }).$target;
      case this.CHAT:
        if (!chats.length) return;
        return new ChatList({ chats }).$target;
      case this.LIKE:
        if (!likeProducts.length) return;
        return new ProductList({ products: likeProducts }).$target;
        break;
      default:
        throw Error('잘못된 메뉴 탭 상태 입력');
    }
  }
}

import testImg0 from '../../../public/img/ImageLarge-0.png';
import testImg1 from '../../../public/img/ImageLarge-1.png';
import testImg2 from '../../../public/img/ImageLarge-2.png';
import ChatList from '../../components/ChatList';

const products = [
  {
    imgUrl: testImg0,
    title: '파란선풍기',
    town: '구암동',
    createdDate: new Date('2021.07.14'),
    price: 24500,
    commentCount: 1,
    likeCount: 2,
    isLiked: true,
  },
  {
    imgUrl: testImg1,
    title: '빈티지 밀크 글래스',
    town: '회기동',
    createdDate: new Date('2021.07.14'),
    price: 158000,
    commentCount: 1,
    isLiked: false,
  },
  {
    imgUrl: testImg2,
    title: '잎사귀 포스터',
    town: '역삼동',
    createdDate: new Date('2021.07.14'),
    price: 58000,
    likeCount: 2,
    isLiked: false,
  },
  {
    imgUrl: testImg0,
    title: '파란선풍기',
    town: '구암동',
    createdDate: new Date('2021.07.14'),
    price: 24500,
    commentCount: 1,
    likeCount: 2,
    isLiked: true,
  },
];

const chats = [
  {
    imgUrl: testImg0,
    userName: 'UserE',
    message: '실제로 신어볼 수 있는 건가요?',
    createDate: new Date('2021.07.14'),
    uncheckedMsgCount: 2,
  },
  {
    imgUrl: testImg1,
    userName: 'UserD',
    message: '감사합니다 :)',
    createDate: new Date('2021.07.14'),
    uncheckedMsgCount: 0,
  },
];

const likeProducts = [
  {
    imgUrl: testImg0,
    title: '파란선풍기',
    town: '구암동',
    createdDate: new Date('2021.07.14'),
    price: 24500,
    commentCount: 1,
    likeCount: 2,
    isLiked: true,
  },
  {
    imgUrl: testImg1,
    title: '빈티지 밀크 글래스',
    town: '회기동',
    createdDate: new Date('2021.07.14'),
    price: 158000,
    commentCount: 1,
    isLiked: true,
  },
];
