import './style.scss';
import locationIcon from '../../../public/assets/postPage/locationIcon.svg';
import submitBtn from '../../../public/assets/postPage/submitButton.svg';
import disableSubmitBtn from '../../../public/assets/postPage/disableSubmitButton.svg';
import API from '../../API/api';
import { getState, setState, subscribe } from '../../utils/globalObserver';
import { createElement } from '../../utils/dom';
import CommonTopBar from '../../components/Common/CommonTopBar';
import PostProductForm from '../../components/PostProductForm';
import { isAblePostSubmit, uploadedImgState, selectedCategoryState } from '../../store/postPage';

export default class Postpage {
  constructor() {
    this.PAGE_TITLE = '글쓰기';

    this.$target = createElement({ tagName: 'div', classNames: ['page', 'post-page'] });
    this.$postLocation = createElement({ tagName: 'div', classNames: ['post-location'] });
    this.$submitBtn = createElement({ tagName: 'div', classNames: ['post-submit-btn'] });

    this.setIsAble = setState(isAblePostSubmit);
    this.inputInfo = {
      title: '',
      price: '',
      description: '',
    };

    this.mount();
  }
  mount() {
    subscribe(isAblePostSubmit, 'PostPage', this.renderSubmitBtn.bind(this));
    this.renderSubmitBtn();
    this.renderLocation();
    this.render();
  }

  addEvent() {
    this.$submitBtn.addEventListener('click', this.handleClickSubmit.bind(this));
  }

  render() {
    const topBar = new CommonTopBar({
      title: this.PAGE_TITLE,
      className: 'post-page-topbar',
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

  renderSubmitBtn() {
    const isAble = getState(isAblePostSubmit);

    this.$submitBtn.innerHTML = `
      <img src=${isAble ? submitBtn : disableSubmitBtn} alt='제출 버튼' />
    `;
  }

  //TODO 목데이터 위치 수정
  renderLocation() {
    this.$postLocation.innerHTML = `
          <img src=${locationIcon} alt='위치 아이콘' />
          <div>역삼동</div>
        `;
  }

  setInputInfo({ title, price, description }) {
    if (title || title === '') this.inputInfo = { ...this.inputInfo, title };
    if (price || price === 0 || price === '') this.inputInfo = { ...this.inputInfo, price };
    if (description || description === '') this.inputInfo = { ...this.inputInfo, description };
  }

  //TODO loaction
  handleClickSubmit() {
    const isAbleSubmit = getState(isAblePostSubmit);
    if (!isAbleSubmit) return;

    const imgs = getState(uploadedImgState);
    const category = getState(selectedCategoryState);
    const { title, price, description } = this.inputInfo;
    const town = '역삼동';
    const postData = {
      title,
      category,
      description,
      town,
      price: price === '' ? null : price,
      imgUrls: imgs,
    };
    this.postProduct(postData);
  }

  postProduct(postData) {
    fetch(API.PRODUCT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  setIsAbleSubmit() {
    const imgs = getState(uploadedImgState);
    const category = getState(selectedCategoryState);
    const { title, description } = this.inputInfo;

    if (title && description && imgs.length && category) return this.setIsAble(true);

    return this.setIsAble(false);
  }
}
