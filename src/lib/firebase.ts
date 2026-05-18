import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLXEx6CWimZm_oxpaDTY-aNGaT98CHGFc",
  authDomain: "kisawan.firebaseapp.com",
  projectId: "kisawan",
  storageBucket: "kisawan.firebasestorage.app",
  messagingSenderId: "223398687932",
  appId: "1:223398687932:web:edc7b001a7f94d20094cb9",
  measurementId: "G-EGRST9L7W4",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

// Persist sessions in the browser (no-op on server)
if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch(() => {});
}
