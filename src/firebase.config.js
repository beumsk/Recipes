// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAOVuHlBTCiQzH-Gtp_lWX0On0IZwqofcc',
  authDomain: 'react-recipe-d2ea6.firebaseapp.com',
  projectId: 'react-recipe-d2ea6',
  storageBucket: 'react-recipe-d2ea6.appspot.com',
  messagingSenderId: '570345974012',
  appId: '1:570345974012:web:de5b02d50e5f9275744f79'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
