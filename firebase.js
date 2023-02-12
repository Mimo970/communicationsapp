// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWW5ErnIOkweeGJokTCAfreYKkgwB-rTY",
  authDomain: "communicationsapp-9ac43.firebaseapp.com",
  projectId: "communicationsapp-9ac43",
  storageBucket: "communicationsapp-9ac43.appspot.com",
  messagingSenderId: "1023188269026",
  appId: "1:1023188269026:web:510be74bc57eee4df0ebbb",
  measurementId: "G-3CWSMLBWMK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
