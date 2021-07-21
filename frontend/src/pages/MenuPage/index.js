import './style.scss';
import { createElement } from '../../utils/dom';
import { getState, subscribe } from '../../utils/globalObserver';
import CommonTopBar from '../../components/Common/CommonTopBar';
import MenuTab from '../../components/MenuTab';
import ProductList from '../../components/ProductList';
import ChatList from '../../components/ChatList';
import { menuTabState } from '../../store/menuPage';
import { userState } from '../../store/user';
import { fetchGetLikeProduct, fetchGetOwnProduct } from '../../api/productAPI';
export default class MenuPage {
  constructor() {
    this.PAGE_TITLE = '메뉴';
    //API에 맞게 이름 변경
    this.SELL = 'sell';
    this.CHAT = 'chat';
    this.LIKE = 'like';
    this.NEED_LOGIN_MSG = '로그인이 필요한 서비스입니다.';
    this.SELL_EMPTY_MSG = '등록한 상품이 없습니다.';
    this.CHAT_EMPTY_MSG = '채팅 기록이 없습니다.';
    this.LIKE_EMPTY_MSG = '관심을 표시한 상품이 없습니다.';

    this.$target = createElement({ tagName: 'div', classNames: ['page'] });
    this.$emptyContent = createElement({ tagName: 'div', classNames: ['menu-empty-content'] });
    this.init();
  }
  init() {
    subscribe(menuTabState, 'MenuPage', this.render.bind(this));
    this.render();
  }
  render() {
    const { userId } = getState(userState);
    this.$target.innerHTML = '';

    const topBar = new CommonTopBar({ title: this.PAGE_TITLE }).$target;
    const menuTab = new MenuTab().$target;
    this.$target.appendChild(topBar);
    this.$target.appendChild(menuTab);
    if (!userId) {
      this.$emptyContent.innerHTML = this.NEED_LOGIN_MSG;
      this.$target.appendChild(this.$emptyContent);
    } else this.getMenuContents(userId).then((contents) => this.$target.appendChild(contents));
  }

  getMenuContents(userId) {
    const { type } = getState(menuTabState);
    //promise로 서버에서 데이터 받아올 곳

    if (type === this.SELL) {
      return fetchGetOwnProduct(userId).then(({ products }) => {
        console.log(products);
        if (!products.length) {
          this.$emptyContent.innerHTML = this.SELL_EMPTY_MSG;
          return this.$emptyContent;
        }
        return new ProductList({ products, isMyProductList: true }).$target;
      });
    }

    if (type === this.CHAT) {
      if (!chats.length) return;
      return new ChatList({ chats }).$target;
    }

    if (type === this.LIKE) {
      return fetchGetLikeProduct().then(({ products }) => {
        if (!products.length) {
          this.$emptyContent.innerHTML = this.LIKE_EMPTY_MSG;
          return this.$emptyContent;
        }
        return new ProductList({ products }).$target;
      });
    }
  }
}
