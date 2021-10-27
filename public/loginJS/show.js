import { signin, login } from "./signinLogin.js";

export function invisibleMenu() {
  const menuContainer = document.querySelector(".container");
  menuContainer.classList.add("menuDown");
  setTimeout(function() {menuContainer.classList.add("menuDownAnd");}, 500);
}

export function visibleMenu() {
  const menuContainer = document.querySelector(".container");
  menuContainer.classList.remove("menuDownAnd");
  setTimeout(function() {menuContainer.classList.remove("menuDown");}, 500);
}

export function showSignin() {
  const body = document.querySelector("body");

  const showContainer = document.createElement('div');
  showContainer.classList.add("showContainer");

  const loginContainer = document.createElement('div');
  loginContainer.classList.add("loginContainer");
  const h1 = document.createElement("h1");
  h1.classList.add("loginH1");
  h1.innerHTML = "회원가입";
  const inputBox = document.createElement('div');
  inputBox.classList.add("inputBox");
  const idBox = document.createElement('input');
  idBox.setAttribute("placeholder", " 원하는 ID를 입력하세요.");
  const pwBox = document.createElement('input');
  pwBox.setAttribute("placeholder", " 원하는 PW를 입력하세요.");
  pwBox.setAttribute("type", "password");
  const btnBox = document.createElement('div');
  btnBox.classList.add("btnBox");
  const goBtn = document.createElement("div");
  const backBtn = document.createElement("div");
  goBtn.classList.add("btn");
  backBtn.classList.add("btn");
  goBtn.innerHTML = "회 원 가 입";
  backBtn.innerHTML = "뒤 로";
  goBtn.addEventListener("click", signin);
  backBtn.addEventListener("click", showUP);

  inputBox.append(idBox, pwBox);
  btnBox.append(goBtn, backBtn);
  loginContainer.append(h1, inputBox, btnBox);
  showContainer.append(loginContainer);
  body.appendChild(showContainer);
  setTimeout(function() {showContainer.classList.add("showDown");}, 1);
}

export function showLogin() {
  const body = document.querySelector("body");

  const showContainer = document.createElement('div');
  showContainer.classList.add("showContainer");

  const loginContainer = document.createElement('div');
  loginContainer.classList.add("loginContainer");
  const h1 = document.createElement("h1");
  h1.classList.add("loginH1");
  h1.innerHTML = "로그인";
  const inputBox = document.createElement('div');
  inputBox.classList.add("inputBox");
  const idBox = document.createElement('input');
  idBox.setAttribute("placeholder", " ID를 입력하세요.");
  const pwBox = document.createElement('input');
  pwBox.setAttribute("placeholder", " PW를 입력하세요.");
  pwBox.setAttribute("type", "password");
  const btnBox = document.createElement('div');
  btnBox.classList.add("btnBox");
  const goBtn = document.createElement("div");
  const backBtn = document.createElement("div");
  goBtn.classList.add("btn");
  backBtn.classList.add("btn");
  goBtn.innerHTML = "로 그 인";
  backBtn.innerHTML = "뒤 로";
  goBtn.addEventListener("click", login);
  backBtn.addEventListener("click", showUP);

  inputBox.append(idBox, pwBox);
  btnBox.append(goBtn, backBtn);
  loginContainer.append(h1, inputBox, btnBox);
  showContainer.append(loginContainer);
  body.appendChild(showContainer);
  setTimeout(function() {showContainer.classList.add("showDown");}, 1);
}

export function showInfo() {
  const body = document.querySelector("body");

  const showContainer = document.createElement('div');
  showContainer.classList.add("showContainer");

  const infoContainer = document.createElement('div');
  infoContainer.classList.add("infoContainer");
  const h1 = document.createElement("h1");
  h1.classList.add("infoH1");
  h1.innerHTML = "소개"
  const ul = document.createElement("ul");
  ul.classList.add("infoUl");
  const li1 = document.createElement("li");
  const li2 = document.createElement("li");
  const li3 = document.createElement("li");
  const li4 = document.createElement("li");
  li1.classList.add("infoLi");
  li2.classList.add("infoLi");
  li3.classList.add("infoLi");
  li4.classList.add("infoLi");
  li1.innerHTML = "해당 서비스는 원하는 비트코인 종목에 대한 급등락 알림을 받을 수 있는 서비스입니다.";
  li2.innerHTML = "로그인을 하시면 해당 서비스를 이용할 수 있습니다.";
  li3.innerHTML = "계정이 없으시면 회원가입을 부탁드립니다.";
  li4.innerHTML = "학부생이 만든 토이 프로젝트로 미흡한 점이 있을 수 있습니다.";
  const btn = document.createElement("div");
  btn.classList.add("btn");
  btn.innerHTML = "확 인";
  btn.addEventListener("click", showUP);

  ul.append(li1, li2, li3, li4);
  infoContainer.append(h1, ul, btn);
  showContainer.append(infoContainer);
  body.appendChild(showContainer);
  setTimeout(function() {showContainer.classList.add("showDown");}, 1);
}

export function showUP() {
  const showContainer = document.querySelector('.showContainer');
  showContainer.classList.remove("showDown");
  visibleMenu();
  setTimeout(function() {showContainer.remove()}, 1000);
}