// import firebase from "firebase/compat/app";
import * as firebase from "firebase/compat";
import "firebase/compat/firestore";
import "firebase/auth";
import "firebase/compat/storage";

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
export default firebase.initializeApp(firebaseConfig);
