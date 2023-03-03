import { initializeApp } from "firebase/app";
import {getAuth  } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCj1Ns8-QtU55RIgZRxsmKwEufatdy-VPs",
  authDomain: "hey-taxi-3fb31.firebaseapp.com",
  projectId: "hey-taxi-3fb31",
  storageBucket: "hey-taxi-3fb31.appspot.com",
  messagingSenderId: "570262603453",
  appId: "1:570262603453:web:ed73cde618c38ccb4d99d4",
  measurementId: "G-L0RL1RPWN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }