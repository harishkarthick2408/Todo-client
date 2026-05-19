import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const envConfig = {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
};

Object.entries(envConfig).forEach(([key, value]) => {
  console.log(`[firebase] ${key}: ${value ? "defined" : "undefined"}`);
});

Object.entries(envConfig).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing Firebase env var: ${key}`);
  }
});

const firebaseConfig = {
  apiKey: envConfig.VITE_FIREBASE_API_KEY,
  authDomain: envConfig.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envConfig.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envConfig.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envConfig.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envConfig.VITE_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
