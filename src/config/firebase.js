// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1JlOYlKNTUfD7vc21Inmm1FvcaJ8aI5A",
  authDomain: "gamesratingbypublic.firebaseapp.com",
  projectId: "gamesratingbypublic",
  storageBucket: "gamesratingbypublic.appspot.com",
  messagingSenderId: "699114894052",
  appId: "1:699114894052:web:77f7d5a350e20c04a2f2f1",
  measurementId: "G-GVCFP2FP96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const colRef = collection(db, "games");
export const usersColRef = collection(db, "users");
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

