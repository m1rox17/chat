import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVfvHXsO4aKivxX7MJRIP8BI-tI7X6UVg",
  authDomain: "chat-961d1.firebaseapp.com",
  projectId: "chat-961d1",
  storageBucket: "chat-961d1.firebasestorage.app",
  messagingSenderId: "1018232357067",
  appId: "1:1018232357067:web:f88e875a4b890352901b4e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
