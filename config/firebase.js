import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCGp-BADbWNchogI2nKRzKrxYmySpWW1mE",
  authDomain: "realtimechat-c163d.firebaseapp.com",
  projectId: "realtimechat-c163d",
  storageBucket: "realtimechat-c163d.appspot.com",
  messagingSenderId: "717238442378",
  appId: "1:717238442378:web:4e150c7dcd8ee0ba711073",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
