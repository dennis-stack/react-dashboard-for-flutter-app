import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiGUyuYzHUdEe-Vjo15cOZIWY2_b3jXIk",
  authDomain: "drugstore-app-7bdbb.firebaseapp.com",
  projectId: "drugstore-app-7bdbb",
  storageBucket: "drugstore-app-7bdbb.appspot.com",
  messagingSenderId: "179864448575",
  appId: "1:179864448575:web:4f48f77cfd64eb87dfd28a",
  measurementId: "G-C7KZSHLVGB"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)