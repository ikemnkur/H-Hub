// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_cEJ-eGyF35ka2mSlxHQmvMAVty9wdgo",
  authDomain: "h-hub-e4708.firebaseapp.com",
  projectId: "h-hub-e4708",
  storageBucket: "h-hub-e4708.appspot.com",
  messagingSenderId: "3933684106",
  appId: "1:3933684106:web:b0dd2cbdad95f031904873",
  measurementId: "G-7LX39WHW6Q"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
