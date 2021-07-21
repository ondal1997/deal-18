import './style.scss';
import { createElement } from '../../../utils/dom';
import pictureIcon from '../../../../public/assets/postPage/pictureIcon.svg';
import imgDeleteButton from '../../../../public/assets/postPage/imgDeleteButton.svg';
import { getState, setState, subscribe } from '../../../utils/globalObserver';
import { uploadedImgState } from '../../../store/postPage';

const API = {
  uploadImg: 'http://localhost:3000/upload',
};

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
    const input = this.$target.querySelector('input');
    this.$target.addEventListener('click', this.handleClick.bind(this));
    input.addEventListener('input', this.handleInputImg.bind(this));
  }

  render() {
    const uploadedImg = getState(uploadedImgState);
    console.log(uploadedImg.length);
    const imgElements = uploadedImg.reduce((acc, src) => (acc += this.getImgElement(src)), '');

    this.$target.innerHTML = `
        <label class='form-img-add-btn' for='input-file'>
          <img src=${pictureIcon} alt='이미지 추가버튼'/>
          <div class='form-img-count'>${uploadedImg.length}/${this.MAX_IMG}</div>
        </label>
        <input type='file' id='input-file' />
        ${imgElements}
      `;
  }
  getImgElement(src) {
    return `
      <div class='form-img'>
        <img src=${src} alt='이미지'/>
        <div class='form-img-delete-btn'>
          <img src=${imgDeleteButton} alt='이미지 삭제 버튼' />
        </div>
      </div>
    `;
  }

  handleClick({ target }) {
    if (this.isDeleteBtn(target)) {
      //TODO 서버 요청 후 this.setUploadedImg
      return;
    }
  }

  handleInputImg({ target: { files } }) {
    const imageBlob = Object.values(files)[0]; //이미지 1개 전송

    const formData = new FormData();
    formData.append('upload', imageBlob);
    this.uploadImg();
  }

  uploadImg() {
    fetch(API.uploadImg, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((img) => this.setUploadedImg((imgs) => [...imgs, img.url]))
      .catch((err) => console.log(err));
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
