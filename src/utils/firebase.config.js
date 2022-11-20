import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqQoKEUOJFQh56KBdM59hLNYBeuK0xDlU",
  authDomain: "fir-auth-aa01d.firebaseapp.com",
  projectId: "fir-auth-aa01d",
  storageBucket: "fir-auth-aa01d.appspot.com",
  messagingSenderId: "964882280519",
  appId: "1:964882280519:web:d268bf6b75fce7af37c162"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)