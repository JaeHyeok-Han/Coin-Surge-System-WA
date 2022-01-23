import { invisibleMenu, showSignin, showLogin, showInfo } from "./show.js";

export function menuClickEventHandler(e) {
  const menu = document.querySelectorAll(".menu");
  const menuicon = document.querySelectorAll(".menuicon");
  if(e.target === menu[0] || e.target === menuicon[0]) {
    invisibleMenu();
    showSignin();
  } else if(e.target === menu[1] || e.target === menuicon[1]) {
    invisibleMenu();
    showLogin();
  } else if(e.target === menu[2] || e.target === menuicon[2]) {
    invisibleMenu();
    showInfo();
  }
};
