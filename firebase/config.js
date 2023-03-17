// import firebase from "firebase/compat/app";
// import * as firebase from "firebase/compat";
// import "firebase/compat/firestore";
// import "firebase/auth";
// import "firebase/compat/storage";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQsLPl8m0k6oiLvcR27DFqaXSDNaq8o6k",
  authDomain: "rn-social-706b6.firebaseapp.com",
  projectId: "rn-social-706b6",
  storageBucket: "rn-social-706b6.appspot.com",
  messagingSenderId: "825734495686",
  appId: "1:825734495686:web:c0dd65e905f1de96d8c6c7",
  measurementId: "G-36NLWZQ1KC",
};

// Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore(app);
export const storage = getStorage(app);
