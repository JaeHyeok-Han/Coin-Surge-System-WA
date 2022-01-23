export class Item {
  constructor(name_ko, name_en) {
    this.name_ko = name_ko;
    this.name_en = name_en;
    this.price;
    this.inter;
    this.node = this.makeItem();
  }

  realPrice() {
    this.inter = setInterval(() => {
      fetch(`https://api.upbit.com/v1/candles/minutes/1?market=${this.name_en}&count=1`)
        .then((jsonres) => jsonres.json())
        .then((res) => {
          this.price.innerHTML = res[0].trade_price;
        });
    }, 1000); /* 추후 0.5S로 바꿀 여지 있음 */
  }

  makeItem() {
    const favItem = document.createElement('div');
    favItem.classList.add('favItem');
    const titleKo = document.createElement('span');
    titleKo.classList.add('favItemTitleKo');
    titleKo.innerHTML = this.name_ko;
    const titleEn = document.createElement('span');
    titleEn.classList.add('favItemTitleEn');
    titleEn.innerHTML = this.name_en;
    this.price = document.createElement('span');
    this.price.classList.add('favItemPrice');
    fetch(`https://api.upbit.com/v1/candles/minutes/1?market=${this.name_en}&count=1`)
      .then((jsonres) => jsonres.json())
      .then((res) => {
        this.price.innerHTML = res[0].trade_price;
      });
    favItem.append(titleKo, titleEn, this.price);
    return favItem;
  }
}