import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const messaging = getFirebaseMessaging()
export const store = getFirestore(app)

export const FIREBASE_COLLECTIONS = {
  TOKEN: "TOKEN",
}

function getFirebaseMessaging() {
  if (typeof window === "undefined" || !globalThis?.navigator) {
    return null
  }

  return getMessaging(app)
}
