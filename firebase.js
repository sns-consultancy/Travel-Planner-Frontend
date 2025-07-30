// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBms6A8daCuitx2J5cxAJAIOIrFzJ89pIs",
  authDomain: "travel-planner-e3ef1.firebaseapp.com",
  projectId: "travel-planner-e3ef1",
  storageBucket: "travel-planner-e3ef1.firebasestorage.app",
  messagingSenderId: "24990445429",
  appId: "1:24990445429:web:6f74abb424bcc3ef26ed3c",
  measurementId: "G-W9QKEEBYFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

