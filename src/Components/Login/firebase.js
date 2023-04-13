// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// import { firebase } from '@firebase/app'
// import '@firebase/auth'
// import '@firebase/firestore'

// const db = firebase.firestore()
// const auth = firebase.auth()

// export { db, auth }

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQuntGFadgGThNN78xk33M4-m43QlJcsg",
  authDomain: "clone-75c04.firebaseapp.com",
  projectId: "clone-75c04",
  storageBucket: "clone-75c04.appspot.com",
  messagingSenderId: "654677749172",
  appId: "1:654677749172:web:697a7422f81d6795ad16e1",
  measurementId: "G-Z8JWR1SVS3",
};


// const firebaseApp = firebase.initialiseApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

// const db = firebaseApp.firestore();
const db = getFirestore(firebaseApp);
// const auth = firebase.auth();
const auth = getAuth(firebaseApp);



export {db, auth};