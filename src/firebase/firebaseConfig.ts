// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArVQqkoCVcsXO0lt7bdQbu76DTucAZJbY",
  authDomain: "student-crud-practice.firebaseapp.com",
  projectId: "student-crud-practice",
  storageBucket: "student-crud-practice.firebasestorage.app",
  messagingSenderId: "436170227002",
  appId: "1:436170227002:web:105137dd2658b8b6806403"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);