// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-96297.firebaseapp.com",
  projectId: "real-estate-96297",
  storageBucket: "real-estate-96297.appspot.com",
  messagingSenderId: "272720284759",
  appId: "1:272720284759:web:55a3e28eb613e65d632712"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);