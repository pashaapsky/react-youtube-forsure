import firebase from "firebase";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCQ85NysIlfqGprzkgcmtoDpqx2TMbPU9g",
    authDomain: "react-youtub3-clone.firebaseapp.com",
    databaseURL: "https://react-youtub3-clone.firebaseio.com",
    projectId: "react-youtub3-clone",
    storageBucket: "react-youtub3-clone.appspot.com",
    messagingSenderId: "582366171766",
    appId: "1:582366171766:web:7f7760e2f30eb04dc3c557"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseProvider = new firebase.auth.GoogleAuthProvider();
firebaseProvider.addScope('https://www.googleapis.com/auth/youtube.readonly');

export {firebaseApp, firebaseProvider};