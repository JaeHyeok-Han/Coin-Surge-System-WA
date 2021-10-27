//인자로 들어온 이름을 가진 cookie가 있는지 확인해서 있다면 해당 쿠키값을, 없으면 undefined를 반환한다.
export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//인자로 들어온 이름과 값을 가지고 "이름=값"형태의 쿠키를 생성한다.
export function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    'max-age': 3600,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

//인자로 들어온 이름을 가진 cookie를 삭제한다.(유효기간을 -1로 설정해서 없어지게끔)
export function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}