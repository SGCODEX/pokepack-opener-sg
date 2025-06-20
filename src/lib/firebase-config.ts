
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the placeholder values below with your actual Firebase project configuration
// You get this from the Firebase console: Project settings > General > Your apps > Web app > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE", // Example: AIzaSyBdLrhMFCr6UUyhQ3wRWTXf8dFuJqjnxxY
  authDomain: "YOUR_AUTH_DOMAIN_HERE", // Example: pokepackopenersg.firebaseapp.com
  projectId: "YOUR_PROJECT_ID_HERE", // Example: pokepackopenersg
  storageBucket: "YOUR_STORAGE_BUCKET_HERE", // Example: pokepackopenersg.appspot.com
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE", // Example: 7903817941
  appId: "YOUR_APP_ID_HERE", // Example: 1:7903817941:web:d92fcf804ae535075af25c
  measurementId: "YOUR_MEASUREMENT_ID_HERE" // Example: G-Q0RM7RYYD5 (Optional)
};

// IMPORTANT: If you encounter an 'auth/unauthorized-domain' error:
// 1. Ensure you have added 'localhost' (for local development) to the "Authorized domains" list
//    in your Firebase project's Authentication settings (Authentication > Sign-in method tab).
// 2. If running in an online IDE or preview environment (like Firebase Studio), you MUST also add
//    the specific domain that environment uses to serve your app (e.g., check the browser's address bar
//    when the error occurs) to the "Authorized domains" list in Firebase.
// 3. When deploying to production, add your live app's domain as well.

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const db = getFirestore(app); // If you plan to use Firestore database
export default app;

