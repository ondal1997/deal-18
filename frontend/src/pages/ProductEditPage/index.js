import locationIcon from '../../../public/assets/postPage/locationIcon.svg';
import submitBtn from '../../../public/assets/postPage/submitButton.svg';
import disableSubmitBtn from '../../../public/assets/postPage/disableSubmitButton.svg';
import CommonTopBar from '../../components/Common/CommonTopBar';

import { createElement } from '../../utils/dom';
import { getState, setState, subscribe } from '../../utils/globalObserver';
import { isAblePostSubmit, selectedCategoryState, uploadedImgState } from '../../store/postPage';
import PostProductForm from '../../components/PostProductForm';

export default class ProductEditPage {
  constructor() {
    this.PAGE_TITLE = '상품 수정하기';

    this.$target = createElement({ tagName: 'div', classNames: ['page', 'product-edit-page'] });
    this.$postLocation = createElement({ tagName: 'div', classNames: ['post-location'] });
    this.$submitBtn = createElement({ tagName: 'div', classNames: ['post-submit-btn'] });

    this.setIsAble = setState(isAblePostSubmit);
    this.inputInfo = {
      title: '',
      price: '',
      description: '',
    };

    this.initState(product);
    this.init();
  }

  init() {
    subscribe(isAblePostSubmit, 'PostPage', this.renderSubmitBtn.bind(this));
    this.setIsAble(true); //수정하기는 초기렌더링 시 true

    this.renderSubmitBtn();
    this.renderLocation();
    this.render();
  }
  initState(product) {
    const { title, price, description, imgUrls, category } = product;
    const setImgs = setState(uploadedImgState);
    const setCategory = setState(selectedCategoryState);
    this.inputInfo = {
      title,
      price,
      description,
    };
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
    // const isAble = true;

    this.$submitBtn.innerHTML = `
      <img src=${isAble ? submitBtn : disableSubmitBtn} alt='제출 버튼' />
    `;
  }
  renderLocation() {
    //TODO 위치는 어떻게 할지 정해야된다.
    // const { primaryTown } = getState(userState);
    const primaryTown = '수정 필요';
    this.$postLocation.innerHTML = `
          <img src=${locationIcon} alt='위치 아이콘' />
          <div>${primaryTown}</div>
        `;
  }
}
const product = {
  id: 8,
  title: '곰인형 1',
  price: 123123,
  description: '귀여운 곰인형',
  town: '역삼동',
  userId: 'kyle',
  state: '판매중',
  category: '디지털기기',
  watchCount: 11,
  createdDate: '2021-07-21T21:46:29.000Z',
  imgUrls: ['/img/b739fb7cbf8c6424e2c50058a29f9c54'],
  likeCount: 1,
  commentCount: 1,
  isYours: false,
  isLiked: false,
};
