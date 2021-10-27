export function writeUserData(id, pw) {
  firebase.database().ref('users/'+id+"/pass").set({
    userPassword: pw,
  });
  firebase.database().ref('users/'+id+"/fav").set({
    userFav: "[]",
  });
  firebase.database().ref('users/'+id+"/notice").set({
    userNotice: "[]",
  });
  const messaging = firebase.messaging();
  messaging.getToken({ vapidKey: 'BBqkVc6uq-yDHLWgEehusxBSp6-OZLdkXsUOETxT8QBpUpL4ewgtnMNpq-cbhiAG_gnF2egwj4YVuUvVCMsifnE' }).then((currentToken) => {
    if (currentToken) {
      firebase.database().ref('users/'+id+"/key").set({
        userToken: currentToken,
      });
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

export async function readUserData(id, pw) {
  const User = firebase.database().ref('users/'+id+"/pass");
  let isUser = false;
  await User.get().then((snapshot) => {
    if (snapshot.exists()) {
      if(pw === snapshot.val().userPassword) isUser = true;
      else isUser = false;
    } else {
      return isUser = false;
    }
  }).catch((error) => {
    console.error(error);
  });
  return isUser
}

export async function readFavData(id) {
  const fav = firebase.database().ref('users/' + id + '/fav');
  let favItem;
  await fav.get().then((snapshot) => {
    if (snapshot.exists()) {
      favItem = JSON.parse(snapshot.val().userFav);
    } else {
    }
  }).catch((error) => {
    console.error(error);
  });
  return favItem;
}

export function writeFavData(id, item) {
  const value = JSON.stringify(item);
  firebase.database().ref('users/' + id + '/fav').set({
    userFav: value,
  });
}

export async function readNoticeData(user) {
  const notice = firebase.database().ref('users/' + user + '/notice');
  let noticeArr;
  await notice.get().then((snapshot) => {
    if (snapshot.exists()) {
      noticeArr = JSON.parse(snapshot.val().userNotice);
    } else {
    }
  }).catch((error) => {
    console.error(error);
  });
  return noticeArr;
}

export async function writeNoticeData(user, item) {
  const value = JSON.stringify(item)
  firebase.database().ref('users/' + user + '/notice').set({
    userNotice: value,
  });
}