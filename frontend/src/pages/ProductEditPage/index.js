import locationIcon from '../../../public/assets/postPage/locationIcon.svg';
import submitBtn from '../../../public/assets/postPage/submitButton.svg';
import disableSubmitBtn from '../../../public/assets/postPage/disableSubmitButton.svg';
import CommonTopBar from '../../components/Common/CommonTopBar';
import PostProductForm from '../../components/PostProductForm';

import { router } from '../..';
import { createElement } from '../../utils/dom';
import { getState, setState, subscribe } from '../../utils/globalObserver';
import { fetchProductDetail, fetchUpdateProduct } from '../../api/productAPI';
import { isAblePostSubmit, selectedCategoryState, uploadedImgState } from '../../store/postPage';
import { pageState } from '../../store/page';
import { userState } from '../../store/user';

export default class ProductEditPage {
  constructor() {
    this.PAGE_TITLE = '상품 수정하기';

    const { params } = getState(pageState);
    this.productId = params.productId;

    this.$target = createElement({ tagName: 'div', classNames: ['page', 'product-edit-page'] });
    this.$postLocation = createElement({ tagName: 'div', classNames: ['post-location'] });
    this.$submitBtn = createElement({ tagName: 'div', classNames: ['post-submit-btn'] });

    this.setIsAble = setState(isAblePostSubmit);
    this.inputInfo = { title: '', price: '', description: '', state: '' };
    this.ownerId = '';
    this.location = '';

    fetchProductDetail(this.productId)
      .then((res) => {
        if (!this.checkAuthentication()) router.pop();
        return res;
      })
      .then((product) => this.initState(product))
      .then(() => this.init())
      .catch(console.error);
  }

  init() {
    this.setIsAble(true); //수정하기는 초기렌더링 시 true

    subscribe(isAblePostSubmit, 'PostPage', this.renderSubmitBtn.bind(this));

    this.renderSubmitBtn();
    this.renderLocation();
    this.render();
    this.addEvent();
  }

  addEvent() {
    this.$submitBtn.addEventListener('click', this.handleClickSubmit.bind(this));
  }

  initState(product) {
    const { title, price, description, state, imgUrls, category } = product;
    const setImgs = setState(uploadedImgState);
    const setCategory = setState(selectedCategoryState);
    this.inputInfo = { title, price, description, state };
    this.location = product.town;
    this.ownerId = product.userId;
    setImgs(imgUrls);
    setCategory(category);
  }

  render() {
    const topBar = new CommonTopBar({
      title: this.PAGE_TITLE,
      className: 'edit-page-topbar',
      menuBtn: this.$submitBtn,
    }).$target;
    const postProductForm = new PostProductForm({
      inputInfo: this.inputInfo,
      setInputInfo: this.setInputInfo.bind(this),
      setIsAbleSubmit: this.setIsAbleSubmit.bind(this),
    }).$target;

    this.$target.appendChild(topBar);
    this.$target.appendChild(postProductForm);
    this.$target.appendChild(this.$postLocation);
  }

  handleClickSubmit() {
    const isAbleSubmit = getState(isAblePostSubmit);
    if (!isAbleSubmit) return;
    const productInfo = this.getProductInfo();
    this.editProduct(this.productId, productInfo);
  }

  editProduct(productId, productInfo) {
    fetchUpdateProduct(productId, productInfo)
      .then(() => router.replace(`/products/${productId}`))
      .catch(console.error);
  }

  getProductInfo() {
    const imgs = getState(uploadedImgState);
    const category = getState(selectedCategoryState);
    const { title, price, description, state } = this.inputInfo;
    const town = this.location;
    const postInfo = {
      title,
      category,
      description,
      town,
      state,
      price: price === '' ? null : price,
      imgUrls: imgs,
    };
    return postInfo;
  }
  checkAuthentication() {
    const { userId } = getState(userState);
    return !!userId && userId === this.ownerId;
  }

  setInputInfo({ title, price, description }) {
    if (title || title === '') this.inputInfo = { ...this.inputInfo, title };
    if (price || price === 0 || price === '') this.inputInfo = { ...this.inputInfo, price };
    if (description || description === '') this.inputInfo = { ...this.inputInfo, description };
  }
  setIsAbleSubmit() {
    const imgs = getState(uploadedImgState);
    const category = getState(selectedCategoryState);
    const { title, description } = this.inputInfo;

    if (title && description && imgs.length && category) return this.setIsAble(true);

    return this.setIsAble(false);
  }

  renderSubmitBtn() {
    const isAble = getState(isAblePostSubmit);

    this.$submitBtn.innerHTML = `
      <img src=${isAble ? submitBtn : disableSubmitBtn} alt='제출 버튼' />
    `;
  }
  renderLocation() {
    const primaryTown = this.location;
    this.$postLocation.innerHTML = `
          <img src=${locationIcon} alt='위치 아이콘' />
          <div>${primaryTown}</div>
        `;
  }
}
