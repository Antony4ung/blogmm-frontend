// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgom4QrnmRPTWNb9AkcJgO5oh_Bou0SJE",
  authDomain: "blog-5da79.firebaseapp.com",
  projectId: "blog-5da79",
  storageBucket: "gs://blog-5da79.appspot.com",
  messagingSenderId: "567949260335",
  appId: "1:567949260335:web:c27da9d19b0421a84cf8da",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);