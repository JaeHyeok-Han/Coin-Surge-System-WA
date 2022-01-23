import { getCookie } from "../publicJS/cookie.js";
import { menuClickEventHandler } from "./menuClick.js";

function index() {
  const user = getCookie("user");
  if(user !== undefined && user !== "") window.location.href = './main.html';

  const menuContainer = document.querySelector(".container");
  menuContainer.addEventListener("click", menuClickEventHandler);
};

index();