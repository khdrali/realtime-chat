// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNwfgb5e4Zw3sgnGz3nnmQxuZNd1zeWfQ",
  authDomain: "realtime-chat-cf7a3.firebaseapp.com",
  projectId: "realtime-chat-cf7a3",
  storageBucket: "realtime-chat-cf7a3.appspot.com",
  messagingSenderId: "591811899224",
  appId: "1:591811899224:web:3c01bc9bbb8af48dd2ff2d",
  databaseURL:
    "https://realtime-chat-cf7a3-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
