
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// CRITICAL: YOU MUST REPLACE ALL PLACEHOLDER VALUES BELOW WITH YOUR ACTUAL
// FIREBASE PROJECT CONFIGURATION.
//
// If you get 'auth/api-key-not-valid':
//   - Your apiKey is incorrect or missing.
//   - Get your config from: Firebase Console > Project Settings > General tab > Your apps > Web app > SDK setup and configuration > Config
//
// If you get 'auth/unauthorized-domain':
//   - The domain your app is running on (check your browser's address bar when the error occurs)
//     is NOT in the "Authorized domains" list in Firebase.
//   - Go to: Firebase Console > Your Project > Authentication > Sign-in method tab > Authorized domains.
//   - Add 'localhost' for local development (e.g., if running on http://localhost:9002).
//   - !! VERY IMPORTANT FOR ONLINE IDEs/PREVIEW ENVIRONMENTS (like Firebase Studio on Cloud Workstations) !!
//     You MUST add the SPECIFIC domain that the IDE/preview uses to serve your app.
//     This might be something like 'your-project-id--random-string.web.app' or,
//     for the URL 'https://6000-firebase-studio-1749498673632.cluster-ubrd2huk7jh6otbgyei4h62ope.cloudworkstations.dev/login',
//     the domain to add would be '6000-firebase-studio-1749498673632.cluster-ubrd2huk7jh6otbgyei4h62ope.cloudworkstations.dev'.
//     Check your browser's address bar when the error appears to find this domain.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const firebaseConfig = {
  apiKey: "AIzaSyBdLrhMFCr6UUyhQ3wRWTXf8dFuJqjnxxY", // <-- REPLACE THIS WITH YOUR ACTUAL API KEY
  authDomain: "pokepackopenersg.firebaseapp.com", // <-- REPLACE THIS
  projectId: "pokepackopenersg", // <-- REPLACE THIS
  storageBucket: "pokepackopenersg.firebasestorage.app", // <-- REPLACE THIS
  messagingSenderId: "7903817941", // <-- REPLACE THIS
  appId: "1:7903817941:web:d92fcf804ae535075af25c", // <-- REPLACE THIS
  measurementId: "G-Q0RM7RYYD5" // <-- REPLACE THIS (Optional)
};


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

