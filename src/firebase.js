import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_q-5JwbrQMxwlRaZlC4CLP7OyAECn5zw",
  authDomain: "survey-form-69819.firebaseapp.com",
  projectId: "survey-form-69819",
  storageBucket: "survey-form-69819.appspot.com",
  messagingSenderId: "518516182578",
  appId: "1:518516182578:web:be4531c9ce18709ea2762b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;