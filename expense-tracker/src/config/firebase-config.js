// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'  //firebase/service here we r using auth 
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAzvXpj9dCLb1_yUaoSYm-uo2Wsb5xUDGs",
  authDomain: "expense-tracker-e17cd.firebaseapp.com",
  projectId: "expense-tracker-e17cd",
  storageBucket: "expense-tracker-e17cd.appspot.com",
  messagingSenderId: "258221064229",
  appId: "1:258221064229:web:8b49dadee72be30cffbfcc",
  measurementId: "G-HL58PHB1SF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth(app)
export const provider = new GoogleAuthProvider();
export const db= getFirestore(app);
const analytics = getAnalytics(app);

//firebase login , firebase init, firebase deploy