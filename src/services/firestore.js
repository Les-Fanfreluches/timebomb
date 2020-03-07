const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDI83DIMO4hrqXNDk9DUwDtUSkKdwtF-xg",
  authDomain: "timebombdespotes.firebaseapp.com",
  databaseURL: "https://timebombdespotes.firebaseio.com",
  projectId: "timebombdespotes",
  storageBucket: "timebombdespotes.appspot.com",
  messagingSenderId: "932003190249",
  appId: "1:932003190249:web:97da0fc39d5d8e8d94a778",
  measurementId: "G-3XMBLPF8J5"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export { db };
