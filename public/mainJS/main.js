import { getCookie, deleteCookie } from "../publicJS/cookie.js";
import { settingShow } from "./settingShow.js";
import { roadFavItem } from './roadFavItem.js';

export const item = [];
export const iterArr = [];

async function init() {
  const user = getCookie("user");
  if(user === undefined || user === "") window.location.href = './index.html';

  const settingBtn = document.querySelector('.mainHeader .userBox .setting');
  settingBtn.addEventListener("click", () => {settingShow(user)});
  
  const logoutBtn = document.querySelector('.mainHeader .userBox i');
  logoutBtn.addEventListener("click", function() {
    deleteCookie("user");
    window.location.href = './index.html';
  })

  await fetch('https://api.upbit.com/v1/market/all')
    .then((jsonres) => jsonres.json())
    .then((res) => {
      res.forEach((ele) => {
        const market = ele.market;
        if(market[0] === 'K') {
          item.push(ele);
        };
      });
    });

  await roadFavItem(user);
}

init();