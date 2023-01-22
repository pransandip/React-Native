// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import Constants from "expo-constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDc3yDlnnu4cBa2nlkvdgLlEUI02fD8niQ',
  authDomain: 'dryvwaze.firebaseapp.com',
  projectId: 'dryvwaze',
  storageBucket: 'dryvwaze.appspot.com',
  messagingSenderId: '826578795236',
  appId: '1:826578795236:web:8ed6b3c4c7cb7cda800af1',
  measurementId: 'G-N2LQHBE44M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage();

// Iniitalize Google Auth Provider
const provider = new GoogleAuthProvider();
provider.addScope("email");
provider.addScope("name");

// Get a list of cities from your database
async function getUsers() {
  const users = collection(db, "users");
  const usersSnapshot = await getDocs(users);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  return usersList;
}

export { auth, db, provider, storage, getUsers };
