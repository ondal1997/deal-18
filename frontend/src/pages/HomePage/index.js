import './style.scss';
import { getState, setState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';
import { createElement } from '../../utils/dom.js';
import MainTopBar from '../../components/MainTopBar';
import ProductList from '../../components/ProductList';
import postButton from '../../../public/assets/homepage/postButton.svg';
import { router } from '../../index';
import { userState } from '../../store/user';

export default class HomePage {
  constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['page', 'home-page'] });
    this.$postBtn = createElement({ tagName: 'div', classNames: ['post-btn'] });
    this.setPageState = setState(pageState);

    this.init();
  }

  init() {
    this.renderPostBtn();
    this.render();
    this.addEvent();
  }

  addEvent() {
    this.$postBtn.addEventListener('click', this.handleClickPostBtn.bind(this));
  }

  render() {
    const topBar = new MainTopBar();
    const productList = new ProductList({ products });
    this.$target.innerHTML = '';
    this.$target.appendChild(topBar.$target);
    this.$target.appendChild(productList.$target);
    this.$target.appendChild(this.$postBtn);
  }

  renderPostBtn() {
    this.$postBtn.innerHTML = `
      <img src=${postButton} alt ='상품 등록하기 버튼' />
    `;
  }

  handleClickPostBtn() {
    const { userId } = getState(userState);
    if (!userId) {
      alert('로그인이 필요합니다.'); //TODO
      return;
    }
    router.push('/post');
  }
}

//목데이터
import testImg0 from '../../../public/img/ImageLarge-0.png';
import testImg1 from '../../../public/img/ImageLarge-1.png';
import testImg2 from '../../../public/img/ImageLarge-2.png';

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
];
