import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Ensure you import getFirestore

const firebaseConfig = {
    apiKey: "AIzaSyCLBrOUX2nItYZTTYzZuafP-RXcOo-Uk0Y",
    authDomain: "intern-assignment-149f8.firebaseapp.com",
    projectId: "intern-assignment-149f8",
    storageBucket: "intern-assignment-149f8.appspot.com",
    messagingSenderId: "807497612125",
    appId: "1:807497612125:web:7747ac0983f60c1035c6b4",
    measurementId: "G-DQSDF7RVKZ"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth

export { app, auth, firestore }; // Export firestore along with app and auth
