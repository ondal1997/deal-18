import './style.scss';
import { createElement } from '../../utils/dom';

class CarouselImgWrapper {
  constructor({ urls, onIndexChange, index }) {
    this.urls = urls;
    this.onIndexChange = onIndexChange;
    this.index = index;
    this.$target = createElement({ tagName: 'div', classNames: ['carousel-img-wrapper'] });
    this.TRANSITION = 'all 0.4s';
    this.PAGE_WIDTH = 320;

    // this.isDragging = false;
    // this.startX = null;
    // this.DELTA = 200;
    this.addListener();
    this.render();
  }

  addListener() {
    this.$target.addEventListener('mousedown', this.handleMousedown);
    this.$target.addEventListener('mouseup', this.handleMouseup);
  }

  handleMousedown = (event) => {
    // this.isDragging = true;
    // this.startX = event.clientX;
  };

  handleMouseup = (event) => {
    // if (!this.isDragging) return;
    // const startX = this.startX;
    // const endX = event.clientX;
    // this.isDragging = false;
    // if (startX - endX <= this.DELTA && this.index > 0) {
    //   this.onIndexChange(this.index - 1);
    // }
    // if (startX - endX >= this.DELTA && this.index < this.urls.length - 1) {
    //   this.onIndexChange(this.index + 1);
    // }
  };

  render() {
    this.$target.style.transform = `translateX(${this.PAGE_WIDTH * this.index}px)`;
    this.$target.style.transition = this.TRANSITION;

    this.$target.innerHTML = this.urls
      .map((url, idx) => `<img class="carousel-img" src="${url}" alt="상품 이미지 ${idx}">`)
      .join('');
  }

  update({ index }) {
    this.index = index;
    this.$target.style.transform = `translateX(-${this.PAGE_WIDTH * this.index}px)`;
  }
}

class CarouselImgNavigation {
  constructor({ count, onIndexChange, index }) {
    this.count = count;
    this.onIndexChange = onIndexChange;
    this.index = index;
    this.$target = createElement({ tagName: 'div', classNames: ['carousel-img-navigation'] });

    this.addListener();
    this.render();
  }

  addListener() {
    this.$target.addEventListener('click', this.handleClick);
  }

  handleClick = ({ target }) => {
    if (target.closest('.carousel-button')) {
      this.onIndexChange(+target.dataset.idx);
    }
  };

  render() {
    this.$target.innerHTML = Array.from(
      { length: this.count },
      (_, i) =>
        `<div class="carousel-button ${this.index === i ? 'carousel-button-selected' : ''}" data-idx="${i}"></div>`,
    ).join('');
  }

  update({ index }) {
    this.index = index;
    this.render();
  }
}

export default class Carousel {
  constructor({ urls }) {
    this.urls = urls;
    this.$target = createElement({ tagName: 'div', classNames: ['carousel'] });
    this.index = 0;
    this.carouselImgBox = new CarouselImgWrapper({
      urls: this.urls,
      onIndexChange: this.onIndexChange.bind(this),
      index: 0,
    });
    this.carouselImgNavigation = new CarouselImgNavigation({
      count: this.urls.length,
      onIndexChange: this.onIndexChange.bind(this),
      index: 0,
    });

    this.render();
  }

  onIndexChange(index) {
    this.index = index;
    this.carouselImgBox.update({ index: this.index });
    this.carouselImgNavigation.update({ index: this.index });
  }

  render() {
    this.$target.appendChild(this.carouselImgBox.$target);
    this.$target.appendChild(createElement({ tageName: 'div', classNames: ['carousel-gradient'] }));
    this.$target.appendChild(this.carouselImgNavigation.$target);
  }
}
