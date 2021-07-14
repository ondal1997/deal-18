import { createElement } from '../utils';

class TownPage {
  constructor({ myTowns }) {
    this.$target = createElement('div', ['']);

    init();
  }

  init() {
    document.addEventListener('myTowns', ({ myTowns }) => {
      this.render({ myTowns });
    });

    document.dispatchEvent("myTowns", data);

    MyTowns.noitfy(data);
    // const townData = TownModel.getTownData()

    this.render({}); // myTownsModel
  }

  getMyTownsAndRender() {
      const data = get~~();
      redner(data);
  }
  getMyTowns(){
      //await get메소드

  }
  render({ myTowns }) {
    const innerHTML = `
            <button>뒤로가기</button>
            <span>내 동네 설정하기</span> 

            <div>
                지역은 최소 1개 이상<br/>
                최대 2개까지 설정 가능해요.
            </div> 

            <div>
            ${myTowns.map((town) => {
              return `<div>${town}</div>`;
            })}
            </div>
        `;
  }
}
