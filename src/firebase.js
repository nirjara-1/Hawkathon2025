// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDB2thwg3N8I5c7maH56yWL3emohXxaqGY",
    authDomain: "threaded-90eb0.firebaseapp.com",
    projectId: "threaded-90eb0",
    storageBucket: "threaded-90eb0.firebasestorage.app",
    messagingSenderId: "104034512649",
    appId: "1:104034512649:web:8c0be4ef76690cb7f0add8",
    measurementId: "G-FM5S7126EY"
  };
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
