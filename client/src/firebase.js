// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-59df0.firebaseapp.com",
  projectId: "estate-59df0",
  storageBucket: "estate-59df0.appspot.com",
  messagingSenderId: "46225051296",
  appId: "1:46225051296:web:9227fe90b1df1c6d9403c5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);