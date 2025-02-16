// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ecc58.firebaseapp.com",
  projectId: "mern-auth-ecc58",
  storageBucket: "mern-auth-ecc58.firebasestorage.app",
  messagingSenderId: "137930065410",
  appId: "1:137930065410:web:e7611175bcef6f2de2891b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);