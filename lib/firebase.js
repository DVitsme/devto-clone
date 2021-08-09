import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBvWw74Kt6WsqNZLaad662ryJfKa0DsgXY',
  authDomain: 'devto-clone-28d3a.firebaseapp.com',
  projectId: 'devto-clone-28d3a',
  storageBucket: 'devto-clone-28d3a.appspot.com',
  messagingSenderId: '689741354751',
  appId: '1:689741354751:web:174264e367da58e9515eca'
};

// Initialize Firebase

const firebase = !Firebase.apps.length
  ? Firebase.initializeApp(firebaseConfig)
  : Firebase.app();

export const auth = firebase.auth();
export const googleAuthProvider = new Firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
