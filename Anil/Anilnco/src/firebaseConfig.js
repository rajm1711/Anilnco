// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS8rHg2CGOjQphuVwfzyrPUzm8BRSgpHY",
  authDomain: "anil-admin.firebaseapp.com",
  projectId: "anil-admin",
  storageBucket: "anil-admin.appspot.com",
  messagingSenderId: "136584995711",
  appId: "1:136584995711:web:c067ef149cdfe8eba3704a",
  measurementId: "G-RCR1PJY9Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const db = getFirestore(app);
