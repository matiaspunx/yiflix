// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;