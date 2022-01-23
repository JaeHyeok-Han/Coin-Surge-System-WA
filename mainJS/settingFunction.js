import { readNoticeData, writeNoticeData } from '../publicJS/dataReadWrite.js';

//알림설정 모달창에서 '알림추가'button을 눌렀을 때 실행될 함수
export async function plusNoticeHandler(e, user) {
  //알림은 6개까지만 설정가능하기 때문에 이미 설정된 알림이 몇 개인지 확인하기 위해서 알림목록 읽어오기
  const noticeArr = await readNoticeData(user);

  //이미 설정된 알림이 6개라면 경고창을 띄우고, 알림추가 reject
  if(noticeArr.length >= 6) {
    alert("알림은 6개까지 설정 가능합니다!");
    e.target.previousElementSibling.value = "";
  }
  //아니라면 사용자가 설정한 설장값들을 가져와서 객체를 만들고, 이미 불러온 noticeArr에 추가해서 알림 추가 실행
  else {
    const section = e.target.previousElementSibling.previousElementSibling.previousElementSibling.value;
    const item = e.target.previousElementSibling.previousElementSibling.value;
    const number = e.target.previousElementSibling.value;
    const temp = {
      "s": section,
      "i": item,
      "v": number,
    }
    noticeArr.push(temp);
    writeNoticeData(user, noticeArr);
    e.target.previousElementSibling.value = "";
    //알림을 추가하고 알림목록을 갱신하기 위해 notice container를 가져와 showNotice함수(알림목록갱신) 실행
    const noticeContainer = document.querySelector('.noticeContainer');
    await showNotice(noticeContainer, user);
  }
}

//알림설정 모달창에서 '삭제하기'button을 눌렀을 때 실행될 함수
async function minusNoticeHandler(e, user) {
  //DB목록에서 삭제해야 하므로 이미 있는 user알림 획득
  const noticeArr = await readNoticeData(user);

  //사용자가 누른 button이 의미하는 알림항목을 객체로 형성
  const section = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute("data-value");
  const item = e.target.parentElement.previousElementSibling.previousElementSibling.getAttribute("data-value");
  const number = e.target.parentElement.previousElementSibling.getAttribute("data-value");
  const temp = {
    "s": section,
    "i": item,
    "v": number,
  }
  //user의 알림목록을 삭제할 알림과 비교하며 순회하며 같은 알림이 나오면 삭제하고 DB갱신
  noticeArr.forEach((ele, i) => {
    if(JSON.stringify(ele) === JSON.stringify(temp)) {
      noticeArr.splice(i, 1);
      writeNoticeData(user, noticeArr);
    }
  })
  //알림을 삭제하고 알림목록을 갱신하기 위해 notice container를 가져와 showNotice함수(알림목록갱신) 실행
  const noticeContainer = document.querySelector('.noticeContainer');
  await showNotice(noticeContainer, user);
}

//알림설정 모달창에서 user의 알림목록을 보여주는 함수
export async function showNotice(noticeContainer, user) {
  //사용자가 설정한 알림목록들을 DB에서 획득
  const noticeArr = await readNoticeData(user);
  
  //목록을 만들기 전에 notice constainer 초기화
  noticeContainer.innerHTML = '';

  //표를 만들고 표의 맨 윗 줄에 '구분, 종목, 지정값, 삭제하기'를 추가
  const table = document.createElement("table");
  table.classList.add('noticeTable');
  const tableHead = document.createElement("tr");
  const headMenu1 = document.createElement("th");
  headMenu1.innerHTML = "구분";
  const headMenu2 = document.createElement("th");
  headMenu2.innerHTML = "종목";
  const headMenu3 = document.createElement("th");
  headMenu3.innerHTML = "지정값";
  const headMenu4 = document.createElement("th");
  headMenu4.innerHTML = "삭제하기";
  tableHead.append(headMenu1, headMenu2, headMenu3, headMenu4);
  table.append(tableHead);
  
  //user의 알림목록을 하나씩 순회하면서 표의 양식에 맞게 추가
  noticeArr.forEach((ele) => {
    const tablebody = document.createElement("tr");
    const bodyMenu1 = document.createElement("td");
    bodyMenu1.innerHTML = ele.s === "1" ? "지정가" : "급등락";
    bodyMenu1.setAttribute("data-value", ele.s === "1" ? "1" : "2");
    const bodyMenu2 = document.createElement("td");
    bodyMenu2.innerHTML = ele.i;
    bodyMenu2.setAttribute("data-value", ele.i);
    const bodyMenu3 = document.createElement("td");
    bodyMenu3.innerHTML = ele.s === "1" ? ele.v + "원" : ele.v + "%";
    bodyMenu3.setAttribute("data-value", ele.v);
    //각 행의 마지막 셀은 '삭제하기' button으로 설정
    const bodyMenu4 = document.createElement("td");
    const minusBtn = document.createElement('i');
    minusBtn.classList.add("fas", "fa-times", "minusBtn");
    minusBtn.addEventListener("click", (e) => {minusNoticeHandler(e, user)});
    bodyMenu4.append(minusBtn);
    tablebody.append(bodyMenu1, bodyMenu2, bodyMenu3, bodyMenu4);
    table.append(tablebody);
  })
  
  //notice container에 생성한 표 부착
  noticeContainer.append(table);
}