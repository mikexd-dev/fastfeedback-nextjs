import firebase, { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

// Initialize Firebase
if (!firebase.apps.length) {
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });

  //   if (typeof window !== 'undefined') {
  //     getAnalytics();
  //   }
}

// Initialize Firebase Auth
// const auth = getAuth();

export default firebase;
