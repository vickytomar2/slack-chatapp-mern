import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLB4Ya2gxocfx2MF681TDp4VwX-klE-Xw",
  authDomain: "slack-clone-321ea.firebaseapp.com",
  databaseURL: "https://slack-clone-321ea.firebaseio.com",
  projectId: "slack-clone-321ea",
  storageBucket: "slack-clone-321ea.appspot.com",
  messagingSenderId: "1007042899246",
  appId: "1:1007042899246:web:2ea2e3cee4718ce55e1ebf",
  measurementId: "G-36HF193T7F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;