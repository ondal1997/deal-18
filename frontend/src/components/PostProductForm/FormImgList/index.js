import './style.scss';
import { createElement } from '../../../utils/dom';
import pictureIcon from '../../../../public/assets/postPage/pictureIcon.svg';
import imgDeleteButton from '../../../../public/assets/postPage/imgDeleteButton.svg';
import { getState, setState, subscribe } from '../../../utils/globalObserver';
import { uploadedImgState } from '../../../store/postPage';
import { fetchGetImg } from '../../../API/imgAPI';

export default class FormImgList {
  constructor({ setIsAbleSubmit }) {
    this.MAX_IMG = 10;
    this.$target = createElement({ tagName: 'div', classNames: ['form-img-list'] });

    this.setIsAbleSubmit = setIsAbleSubmit;
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
    this.$target.addEventListener('change', this.handleInputImg.bind(this));
  }

  render() {
    const uploadedImg = getState(uploadedImgState);
    const imgElements = uploadedImg.reduce((acc, src, idx) => (acc += this.getImgElement(src, idx)), '');

    this.$target.innerHTML = `
        <label class='form-img-add-btn' for='input-file'>
          <img src=${pictureIcon} alt='이미지 추가버튼'/>
          <div class='form-img-count'>${uploadedImg.length}/${this.MAX_IMG}</div>
        </label>
        <input type='file' id='input-file' />
        ${imgElements}
      `;
  }
  getImgElement(src, idx) {
    return `
      <div class='form-img'>
        <img src=${src} alt='이미지'/>
        <div class='form-img-delete-btn' data-index=${idx} >
          <img src=${imgDeleteButton} alt='이미지 삭제 버튼' />
        </div>
      </div>
    `;
  }

  handleClick({ target }) {
    if (!this.isDeleteBtn(target)) return;
    const deleteBtn = target.closest('.form-img-delete-btn');
    const index = +deleteBtn.dataset.index;
    this.setUploadedImg((imgs) => imgs.filter((_, idx) => idx !== index));
    this.setIsAbleSubmit();
  }

  handleInputImg({ target }) {
    if (target.tagName !== 'INPUT') return;

    const imageBlob = Object.values(target.files)[0]; //이미지 1개 전송
    const formData = new FormData();
    formData.append('upload', imageBlob);
    this.uploadImg(formData);
    target.value = null;
  }

  uploadImg(formData) {
    fetchGetImg(formData)
      .then((img) => this.setUploadedImg((imgs) => [...imgs, img.url]))
      .then(this.setIsAbleSubmit)
      .catch(console.error);
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
