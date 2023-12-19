import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBY1FQvo3G8zkpZEYZeWcrSjrvprQGT4Cg",
  authDomain: "flixhive-bbda7.firebaseapp.com",
  projectId: "flixhive-bbda7",
  storageBucket: "flixhive-bbda7.appspot.com",
  messagingSenderId: "329026724905",
  appId: "1:329026724905:web:433602bbb05229e847a838",
  measurementId: "G-LBJ8HBWKL5"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
