import './style.scss';

import { createElement } from '../../utils/dom';
import { getState } from '../../utils/globalObserver.js';
import { pageState } from '../../store/page.js';

import Carousel from '../../components/Carousel';
import ProductDetailTopBar from '../../components/ProductDetailTopBar';
import ProductDetailInfo from '../../components/ProductDetailInfo';
import ProductDetailBottomBar from '../../components/ProductDetailBottomBar';

// mock
import testImg0 from '../../../public/img/ImageLarge-0.png';
import testImg1 from '../../../public/img/ImageLarge-1.png';
import testImg2 from '../../../public/img/ImageLarge-2.png';
const product = {
  title: '빈티지 롤러 스케이트',
  category: '기타 중고물품',
  createdDate: Date.now(),
  description: `어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해 드립니다. 단품 입고 되었습니다.
새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235 입니다.`,
  commentCount: 3,
  likeCount: 2,
  watchCount: 29,
  userId: 'ondal1997',
  town: '구암동',
  state: '판매중',
  price: 169000,
  imgUrls: [testImg0, testImg1, testImg2],
  isLiked: false,
  isYours: true,
};

export default class ProductDetailPage {
  constructor() {
    const { params } = getState(pageState);
    this.productId = params.productId;

    this.isLoaded = false;
    this.product = null;

    this.$target = createElement({ tagName: 'div', classNames: ['page', 'product-detail-page'] });

    this.fetchProductDetail(this.productId);
    this.render();
  }

  fetchProductDetail(productId) {
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error); // TODO: custom modal로 변경하기
          return;
        }

        this.isLoaded = true;
        this.product = res;
        this.render();
      });
  }

  render() {
    const { product, isLoaded } = this;

    if (!isLoaded) {
      this.$target.innerHTML = 'Loading...';
      return;
    }

    this.$target.innerHTML = '';
    this.$target.appendChild(new ProductDetailTopBar({ product }).$target);
    this.$target.appendChild(new Carousel({ urls: product.imgUrls }).$target);
    this.$target.appendChild(new ProductDetailInfo({ product }).$target);
    this.$target.appendChild(new ProductDetailBottomBar({ product }).$target);
  }
}
