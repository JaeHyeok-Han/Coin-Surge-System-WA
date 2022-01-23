import { writeUserData, readUserData } from '../publicJS/dataReadWrite.js';
import { setCookie } from '../publicJS/cookie.js';
import { showUP } from './show.js';

export function signin() {
  const idBox = document.querySelector('.inputBox input:nth-child(1)');
  const pwBox = document.querySelector('.inputBox input:nth-child(2)');
  writeUserData(idBox.value, pwBox.value);
  showUP();
}

export async function login() {
  const idBox = document.querySelector('.inputBox input:nth-child(1)');
  const pwBox = document.querySelector('.inputBox input:nth-child(2)');
  const isUesr = await readUserData(idBox.value, pwBox.value);

  if(isUesr) {
    setCookie("user", idBox.value);
    window.location.href = './index.html';
  } else {
    alert("존재하지 않는 계정이거나 비밀번호가 틀렸습니다.");
    idBox.value = "";
    pwBox.value = "";
  }
}