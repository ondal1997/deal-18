import ProductItem from './ProductItem';
import { createElement } from '../../utils/dom';

export default class ProductList {
  constructor({ products, isMyProductList }) {
    // constructor() {
    this.$target = createElement({ tagName: 'div', classNames: ['product-list'] });
    this.products = products;
    this.isMyProductList = isMyProductList;

    this.init();
  }
  init() {
    this.render();
  }
  render() {
    this.products.forEach((product) => {
      this.$target.appendChild(new ProductItem({ product, isMyProduct: this.isMyProductList }).$target);
    });
  }
}

// import testImg0 from '../../../public/img/ImageLarge-0.png';
// import testImg1 from '../../../public/img/ImageLarge-1.png';
// import testImg2 from '../../../public/img/ImageLarge-2.png';

// const products = [
//   {
//     imgUrl: testImg0,
//     title: '파란선풍기',
//     town: '구암동',
//     createdDate: new Date('2021.07.14'),
//     price: 24500,
//     commentCount: 1,
//     likeCount: 2,
//     isLiked: true,
//   },
//   {
//     imgUrl: testImg1,
//     title: '빈티지 밀크 글래스',
//     town: '회기동',
//     createdDate: new Date('2021.07.14'),
//     price: 158000,
//     commentCount: 1,
//     isLiked: false,
//   },
//   {
//     imgUrl: testImg2,
//     title: '잎사귀 포스터',
//     town: '역삼동',
//     createdDate: new Date('2021.07.14'),
//     price: 58000,
//     likeCount: 2,
//     isLiked: false,
//   },
//   {
//     imgUrl: testImg0,
//     title: '파란선풍기',
//     town: '구암동',
//     createdDate: new Date('2021.07.14'),
//     price: 24500,
//     commentCount: 1,
//     likeCount: 2,
//     isLiked: true,
//   },
//   {
//     imgUrl: testImg1,
//     title: '빈티지 밀크 글래스',
//     town: '회기동',
//     createdDate: new Date('2021.07.14'),
//     price: 158000,
//     commentCount: 1,
//     isLiked: false,
//   },
//   {
//     imgUrl: testImg2,
//     title: '잎사귀 포스터',
//     town: '역삼동',
//     createdDate: new Date('2021.07.14'),
//     price: 58000,
//     likeCount: 2,
//     isLiked: false,
//   },
//   {
//     imgUrl: testImg0,
//     title: '파란선풍기',
//     town: '구암동',
//     createdDate: new Date('2021.07.14'),
//     price: 24500,
//     commentCount: 1,
//     likeCount: 2,
//     isLiked: true,
//   },
//   {
//     imgUrl: testImg1,
//     title: '빈티지 밀크 글래스',
//     town: '회기동',
//     createdDate: new Date('2021.07.14'),
//     price: 158000,
//     commentCount: 1,
//     isLiked: false,
//   },
//   {
//     imgUrl: testImg2,
//     title: '잎사귀 포스터',
//     town: '역삼동',
//     createdDate: new Date('2021.07.14'),
//     price: 58000,
//     likeCount: 2,
//     isLiked: false,
//   },
// ];
