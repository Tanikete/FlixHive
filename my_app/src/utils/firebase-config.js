import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCAeT8XT61IdoHzTf-w7Rp3RIdrJf2xgS4",
  authDomain: "hackathon-2-js.firebaseapp.com",
  projectId: "hackathon-2-js",
  storageBucket: "hackathon-2-js.appspot.com",
  messagingSenderId: "300961431313",
  appId: "1:300961431313:web:f965131e7c8abeb78456b0",
  measurementId: "G-QXFBPWX3R7"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

// Path: FlixHive/my_app/src/utils/firebase-config.js