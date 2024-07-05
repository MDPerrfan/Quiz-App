// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA-y3Nznwly4qDiWHGSupG70mGaSmU050",
  authDomain: "fir-quiz-a489a.firebaseapp.com",
  projectId: "fir-quiz-a489a",
  storageBucket: "fir-quiz-a489a.appspot.com",
  messagingSenderId: "16029631770",
  appId: "1:16029631770:web:1f1898567f0627297418a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
const db = getFirestore(app);