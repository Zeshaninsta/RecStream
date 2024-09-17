import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const App = initializeApp({
  apiKey: "AIzaSyDTKNpjVE5LRUifgsuRBOefBFbcAxAdqaU",
  authDomain: "recstream-e8255.firebaseapp.com",
  projectId: "recstream-e8255",
  storageBucket: "recstream-e8255.appspot.com",
  messagingSenderId: "32207679092",
  appId: "1:32207679092:web:d646c99f60c88cd1c3eb21",
  measurementId: "G-D97239HQS4"
});

// Initialize Firebase
const db = getFirestore(App);
const storage = getStorage(App);
const analytics = getAnalytics(App);
const auth = getAuth(App);

export { db, storage, analytics, auth };
