importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBcT5fm0UXA6VAcsluEYUmEhMjCEgLZG8Q",
  authDomain: "myproject-01-e76d0.firebaseapp.com",
  databaseURL: "https://myproject-01-e76d0-default-rtdb.firebaseio.com",
  projectId: "myproject-01-e76d0",
  storageBucket: "myproject-01-e76d0.appspot.com",
  messagingSenderId: "393640707078",
  appId: "1:393640707078:web:07791a4435de279f692f87",
  measurementId: "G-JPYQSVV0NW"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
});