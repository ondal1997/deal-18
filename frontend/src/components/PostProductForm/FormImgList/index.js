import './style.scss';
import { createElement } from '../../../utils/dom';
import pictureIcon from '../../../../public/assets/postPage/pictureIcon.svg';
import imgDeleteButton from '../../../../public/assets/postPage/imgDeleteButton.svg';
import { getState, setState, subscribe } from '../../../utils/globalObserver';
import { uploadedImgState } from '../../../store/postPage';

export default class FormImgList {
  constructor() {
    this.MAX_IMG = 10;
    this.$target = createElement({ tagName: 'div', classNames: ['form-img-list'] });

    this.setUploadedImg = setState(uploadedImgState);
    this.init();
  }
  init() {
    subscribe(uploadedImgState, 'FormImgList', this.render.bind(this));
    this.render();
    this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    const uploadedImg = getState(uploadedImgState);
    const imgElements = uploadedImg.reduce((acc, src) => (acc += this.getImgElement(src)), '');

    this.$target.innerHTML = `
        <label class='form-img-add-btn' for='input-file'>
          <img src=${pictureIcon} alt='이미지 추가버튼'/>
          <div class='form-img-count'>${uploadedImg.length}/${this.MAX_IMG}</div>
        </label>
        <input type='file' id='input-file'/>
        ${imgElements}
      `;
  }
  getImgElement(src) {
    return `
      <div class='form-img'>
        <img src=${src} alt='이미지' />
        <div class='form-img-delete-btn'>
          <img src=${imgDeleteButton} alt='이미지 삭제 버튼' />
        </div>
      </div>
    `;
  }

  handleClick({ target }) {
    if (this.isAddBtn(target)) {
      if (this.hasMaxImg()) return;

      //TODO: 서버 요청 후 this.setUploadedImg 실행

      return;
    }

    if (this.isDeleteBtn(target)) {
      //TODO 서버 요청 후 this.setUploadedImg
      return;
    }
  }

  isAddBtn(target) {
    return !!target.closest('.form-img-add-btn');
  }

  isDeleteBtn(target) {
    return !!target.closest('.form-img-delete-btn');
  }

  hasMaxImg() {
    const uploadedImg = getState(uploadedImgState);
    return uploadedImg.length === this.MAX_IMG;
  }
}
