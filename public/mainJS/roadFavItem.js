import { item, iterArr } from './main.js';
import { Item } from '../publicJS/itemClass.js';
import { readFavData } from '../publicJS/dataReadWrite.js';

export async function roadFavItem(user) {
  const favContent = document.querySelector('.favContent');
  favContent.innerHTML = '';

  const myItem = await readFavData(user);
  if(myItem.length !== 0) {
    myItem.forEach((name_en) => {
      let name_ko;
      item.forEach((el) => {
        const name = el.market;
        if(name === name_en) {
          name_ko = el.korean_name;
        }
      })
      const node = new Item(name_ko, name_en);
      node.realPrice();
      iterArr.push(node.inter);
      favContent.append(node.node);
    });
  } else {
    const noItem = document.createElement('div');
    noItem.classList.add('noItem');
    const noIcon = document.createElement('i');
    noIcon.classList.add('fas', 'fa-exclamation-circle', 'noItemIcon');
    const noText = document.createElement('span');
    noText.classList.add('noItemText');
    noText.innerHTML = '즐겨찾기한 종목이 없습니다!';
    
    noItem.append(noIcon, noText);
    favContent.append(noItem);
  }
}