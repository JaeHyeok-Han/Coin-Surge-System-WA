import { getCookie } from '../publicJS/cookie.js';
import { item, iterArr } from './main.js';
import { readFavData, writeFavData } from '../publicJS/dataReadWrite.js';
import { roadFavItem } from './roadFavItem.js';

export async function starEventHandler(e, user) {
  if(e.target.classList.length === 3) {
    const myItem = await readFavData(user);
    myItem.forEach((ele, i) => {
      if(ele === e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML) {
        myItem.splice(i, 1);
      }
    })
    e.target.classList.remove('yellow');
    await writeFavData(user, myItem);
    iterArr.forEach((ele) => {
      clearInterval(ele);
    })
    iterArr.splice(0, iterArr.length);
    roadFavItem(user);
  } else {
    const myItem = await readFavData(user);
    if(myItem.length > 2) {
      alert('즐겨찾기는 3개까지만 등록됩니다.');
    } else {
      myItem.push(e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML);
      e.target.classList.add('yellow');
      writeFavData(user, myItem);
      roadFavItem(user);
    }
  }
};


async function searchEventHandler(user) {
  const searchInput = document.querySelector('.searchInput');
  let str = searchInput.value;
  if(str.length <= 1) {
    alert('검색어를 2글자 이상 입력하세요.');
  } else {
    const mainContent = document.querySelector('.mainContent');
    mainContent.innerHTML = '';

    const itemName = item.filter((ele) => ele.korean_name.includes(str));
    const myItem = await readFavData(user);
    itemName.forEach((ele) => {
      fetch(`https://api.upbit.com/v1/candles/minutes/1?market=${ele.market}&count=1`)
        .then((jsonres) => jsonres.json())
        .then((res) => {
          const itemBox = document.createElement('div');
          itemBox.classList.add('item');
          itemBox.innerHTML = `
            <span>${ele.korean_name}</span>
            <span>${ele.market}</span>
            <span>${res[0].trade_price}</span>
          `;
          const starBox = document.createElement('span');
          const star = document.createElement('i');
          if(myItem.includes(ele.market)) {
            star.classList.add('fas', 'fa-star', 'yellow');
          } else {
            star.classList.add('fas', 'fa-star');
          }
          star.addEventListener('click', (e) => {starEventHandler(e, user)});
          
          starBox.appendChild(star);
          itemBox.appendChild(starBox);
          mainContent.appendChild(itemBox);
        })
    });
  }
}


function search() {
  const user = getCookie("user");
  if(user === undefined || user === "") window.location.href = './login.html';

  const searchBtn = document.querySelector('.searchBtn');
  searchBtn.addEventListener('click', () => {searchEventHandler(user)});
}

search();