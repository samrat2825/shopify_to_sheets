import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyArJmBG5Zz5bwOQ52h3pG2pNpdX0YNaNyY',
  authDomain: 'spotify-to-sheets-d68e8.firebaseapp.com',
  projectId: 'spotify-to-sheets-d68e8',
  storageBucket: 'spotify-to-sheets-d68e8.appspot.com',
  messagingSenderId: '1013958064901',
  appId: '1:1013958064901:web:414da1f88ba51edee9d56c',
  measurementId: 'G-46EV76T2RV',
};

const app = firebase.initializeApp(firebaseConfig);
export const storageRef = firebase.storage().ref();
export const auth = app.auth();
export const firestore = app.firestore();
