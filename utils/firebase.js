import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const createUserWith_Email_Password = createUserWithEmailAndPassword;
export const signIn_WithEmailAndPassword = signInWithEmailAndPassword;
export const onAuth_StateChanged = onAuthStateChanged;
export const sign_Out = signOut;
export const functions = getFunctions(app, 'europe-west3');
export const storage = getStorage(app);
export const myref = ref;
export const my_deleteObject = deleteObject;
export const db = getFirestore(app);
export const dbcollection = collection;
export const dbaddDoc = addDoc;
export const dbgetDocs = getDocs;
export default app;
