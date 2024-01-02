// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-63fe2.firebaseapp.com",
  projectId: "mern-estate-63fe2",
  storageBucket: "mern-estate-63fe2.appspot.com",
  messagingSenderId: "106054669525",
  appId: "1:106054669525:web:f9583081a50a9c3f7fbe5c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
