import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDZI4o1XwQenjXnRl8MGICnPmnthY6GoO8",
  authDomain: "drinkydashboard.firebaseapp.com",
  databaseURL: "https://drinkydashboard.firebaseio.com",
  projectId: "drinkydashboard",
  storageBucket: "drinkydashboard.appspot.com",
  messagingSenderId: "34740767081",
  appId: "1:34740767081:web:f14b66df23d5ab4835d5f8"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
