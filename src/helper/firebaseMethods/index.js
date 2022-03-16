import firebase from 'firebase/app';
import { auth, firestore } from '../../firebaseSetup';
import { setLoading, resetLoading, signIn } from '../../redux/Actions/actions';
import { store } from '../../redux/Store/store';

export const authGaurdLogin = async (email, password) => {
  setLoading();
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let token = firebase.auth().currentUser;
      signIn(token);
    })
    .catch((error) => {
      alert(error);
    });
  resetLoading();
};

export const authGaurdSignUp = async (email, password) => {
  setLoading();
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      let token = firebase.auth().currentUser;
      signIn(token);
      const uid = token.uid;
      let newConfig = {};
      newConfig['refreshes'] = '1';
      newConfig['apikey'] = '';
      newConfig['shop'] = '';
      newConfig['timeout'] = '300';
      await firestore
        .collection('users')
        .doc(uid)
        .set({ ...newConfig });
      // console.log(uid, { ...newConfig });
    })
    .catch((error) => {
      console.log(error);
    });

  resetLoading();
};

export const setConfig = async (config) => {
  const uid = store.getState().user.uid;
  await firestore
    .collection('users')
    .doc(uid)
    .set({ ...config });
};

export const getConfig = async () => {
  const uid = store.getState().user.uid;
  let config;
  await firestore
    .collection('users')
    .doc(uid)
    .get()
    .then((res) => {
      config = res.data();
    })
    .catch((e) => console.log(e));
  // console.log(config, 'firestore');
  return config;
};
