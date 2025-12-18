import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_m0ZaAS15W7r5srlWZo5LNlTkaI9kw9I",
  authDomain: "user-management-50dd5.firebaseapp.com",
  projectId: "user-management-50dd5",
  storageBucket: "user-management-50dd5.firebasestorage.app",
  messagingSenderId: "130906783666",
  appId: "1:130906783666:web:5a21ef60eed96ddf856eab"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
