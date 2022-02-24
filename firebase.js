import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyA5-YBv8lJv11K7SmcuULBoE0KSvqu8ik8",
  authDomain: "sras-project-3db39.firebaseapp.com",
  projectId: "sras-project-3db39",
  storageBucket: "sras-project-3db39.appspot.com",
  messagingSenderId: "732675147701",
  appId: "1:732675147701:web:8ac3eac0844db3c671bbfc",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
