import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnmOz6UCCXOSzQ5pXZukrEfPqFFSzRorA",
  authDomain: "blus-66a71.firebaseapp.com",
  projectId: "blus-66a71",
  storageBucket: "blus-66a71.appspot.com",
  messagingSenderId: "540656880223",
  appId: "1:540656880223:web:b121a0e860e0be55a629ea",
  measurementId: "G-SW58F3YWFD",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
