// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzQOdhD3d1epYbWd08JV3e3up-UNR8Q5I",
  authDomain: "test-e6ea8.firebaseapp.com",
  databaseURL: "https://test-e6ea8-default-rtdb.firebaseio.com",
  projectId: "test-e6ea8",
  storageBucket: "test-e6ea8.firebasestorage.app",
  messagingSenderId: "521154621831",
  appId: "1:521154621831:web:ae8de182c4a2f702966322",
  measurementId: "G-0643CCP8M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, analytics };
