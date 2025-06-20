
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Helper function to get environment variables or throw an error during build if not found
function getEnvVar(varName: string, isOptional: boolean = false): string {
  const value = process.env[varName];
  if (!value && !isOptional) {
    // This error will halt the build on Vercel if a required env var is missing, which is good.
    throw new Error(`Missing required environment variable for Firebase config: ${varName}. Ensure it's set in your Vercel project settings.`);
  }
  return value || ""; // Return empty string if optional and not set, or the value itself
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// CRITICAL: THESE VALUES ARE NOW SOURCED FROM ENVIRONMENT VARIABLES.
// You MUST set these in your Vercel project settings:
// Your Vercel Project > Settings > Environment Variables
//
// Example Variables to Add in Vercel (replace placeholder_values with YOUR actual Firebase project values):
//
// Name: NEXT_PUBLIC_FIREBASE_API_KEY
// Value: placeholder_your_actual_api_key
//
// Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
// Value: placeholder_your_actual_auth_domain (e.g., pokepackopenersg.firebaseapp.com)
//
// Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
// Value: placeholder_your_actual_project_id (e.g., pokepackopenersg)
//
// Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
// Value: placeholder_your_actual_storage_bucket (e.g., pokepackopenersg.appspot.com)
//
// Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
// Value: placeholder_your_actual_messaging_sender_id
//
// Name: NEXT_PUBLIC_FIREBASE_APP_ID
// Value: placeholder_your_actual_app_id
//
// Name: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID (This one is optional)
// Value: placeholder_your_actual_measurement_id (if you have one)
//
// You can find YOUR specific values in your Firebase Console:
// Project Settings (gear icon) > General tab > Your apps > Web app > SDK setup and configuration > Config
//
// If you get 'auth/api-key-not-valid' on your deployed Vercel app:
//   - One or more of these environment variables are missing or incorrect in Vercel.
//
// If you get 'auth/unauthorized-domain' on your deployed Vercel app:
//   - The domain your Vercel app is running on (e.g., your-project-name.vercel.app)
//     is NOT in the "Authorized domains" list in Firebase Authentication.
//   - Go to: Firebase Console > Your Project > Authentication > Sign-in method tab > Authorized domains.
//   - Add your Vercel deployment domain (e.g., pokepack-opener-sg.vercel.app).
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const firebaseConfigValues = {
  apiKey: getEnvVar("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: getEnvVar("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: getEnvVar("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: getEnvVar("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getEnvVar("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getEnvVar("NEXT_PUBLIC_FIREBASE_APP_ID"),
  measurementId: getEnvVar("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID", true) // Measurement ID is optional
};

let app: FirebaseApp;
let authInstance: Auth;
let dbInstance: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfigValues);
} else {
  app = getApp();
}

authInstance = getAuth(app);
dbInstance = getFirestore(app);

export const auth = authInstance;
export const db = dbInstance;
export default app;
