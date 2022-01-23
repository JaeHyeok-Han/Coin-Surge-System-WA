import { readFavData } from '../publicJS/dataReadWrite.js';
import { item } from './main.js';
import { plusNoticeHandler, showNotice } from "./settingFunction.js";

export async function settingShow(user) {  
  //알림설정 모달창이 열리면 설정버튼이 클릭되지 않게 설정
  const settingBtn = document.querySelector(".mainHeader .userBox .setting");
  settingBtn.removeEventListener("click", settingShow);
  settingBtn.style.cursor = "default";

  //body에 붙히기 위해서 body DOM요소를 획득하고, 모달창 생성
  const body = document.querySelector("body");
  const showContainer = document.createElement('div');
  showContainer.classList.add("showContainer");

  //알림설정 container 생성
  const settingContainer = document.createElement('div');
  settingContainer.classList.add("settingContainer");
  //알림설정 제목 생성
  const h1 = document.createElement("h1");
  h1.classList.add("settingH1");
  h1.innerHTML = "알림설정";
  //여러 설정값을 지정할 수 있는 알림설정 bar 생성
  const plusDiv = document.createElement('div');
  plusDiv.classList.add("plusDiv");
  //지정가와 급등락을 선택하는 dropdown 생성
  const sectionDrop = document.createElement('select');
  sectionDrop.classList.add("drop");
  const section1 = document.createElement('option');
  section1.setAttribute("value", "1");
  section1.innerHTML = "지정가";
  const section2 = document.createElement('option');
  section2.setAttribute("value", "2");
  section2.innerHTML = "급등락";
  sectionDrop.append(section1, section2);
  //user의 즐겨찾기 목록을 가져와 종목을 선택하는 dropdown 생성
  const itemDrop = document.createElement('select');
  itemDrop.classList.add("drop");
  const userItem = await readFavData(user);
  userItem.forEach((name_en) => {
    let name_ko;
    item.forEach((el) => {
      const name = el.market;
      if(name === name_en) {
        name_ko = el.korean_name;
      }
    });
    const menu = document.createElement('option');
    menu.setAttribute("value", name_en);
    menu.innerHTML = name_ko;
    itemDrop.append(menu);
  });
  //지정가일때는 가격, 급등락일때는 퍼센트를 입력하는 input박스 생성
  const input = document.createElement('input');
  input.classList.add("input");
  //모든 설정값을 지정하고 알림을 추가할 수 있는 button 생성
  const plusBtn = document.createElement('i');
  plusBtn.classList.add("fas", "fa-plus", "plusBtn");
  plusBtn.addEventListener("click", (e) => {plusNoticeHandler(e, user)});
  plusDiv.append(sectionDrop, itemDrop, input, plusBtn);
  //user가 설정한 알림목록들을 가져와서 보여주는 알림 container 생성
  const noticeContainer = document.createElement('div');
  noticeContainer.classList.add("noticeContainer");
  showNotice(noticeContainer, user);
  //알림설정 모달창을 닫고 다시 설정버튼이 활성화되도록 하는 button 생성
  const outBtn = document.createElement("div");
  outBtn.classList.add("btn");
  outBtn.innerHTML = "닫기";
  outBtn.addEventListener("click", function(){
    showContainer.classList.remove("showDown");
    settingBtn.addEventListener("click", settingShow);
    settingBtn.style.cursor = "pointer";
    setTimeout(function() {showContainer.remove()}, 1000);
  });

  //알림설정 container에 제목, 설정 bar, 공지 container, 닫기 button 부착
  settingContainer.append(h1, plusDiv, noticeContainer, outBtn);
  showContainer.append(settingContainer);
  body.appendChild(showContainer);
  setTimeout(function() {showContainer.classList.add("showDown");}, 1);
}