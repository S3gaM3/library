// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn7_raOuwU-lKboEEenlO939q8YhiEEb8",
  authDomain: "library-a7a92.firebaseapp.com",
  projectId: "library-a7a92",
  storageBucket: "library-a7a92.firebasestorage.app",
  messagingSenderId: "655110121434",
  appId: "1:655110121434:web:48fbdcadf5812bfcd7c2e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);