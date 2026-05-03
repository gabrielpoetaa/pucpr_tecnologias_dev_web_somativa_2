import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJ5iFHeSdBlQzxbnt76-09ByugZWn6eig",
  authDomain: "atividade-somativa-2-35729.firebaseapp.com",
  projectId: "atividade-somativa-2-35729",
  storageBucket: "atividade-somativa-2-35729.firebasestorage.app",
  messagingSenderId: "466155729759",
  appId: "1:466155729759:web:f5395817193b0125ccfcea"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
