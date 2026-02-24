// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';

// const firebaseConfig = {
//   // з console.firebase.google.com
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// let appPromise: Promise<any> | null = null;
// let authPromise: Promise<any> | null = null;
// let dbPromise: Promise<any> | null = null;

// export const getApp = () => {
//   if (!appPromise) {
//     appPromise = (async () => {
//       if (typeof window === 'undefined') {
//         throw new Error('Firebase only available on client');
//       }
//       return initializeApp(firebaseConfig);
//     })();
//   }
//   return appPromise;
// };

// export const getAuthInstance = async () => {
//   const app = await getApp();
//   return getAuth(app);
// };

// export const getDatabaseInstance = async () => {
//   const app = await getApp();
//   return getDatabase(app);
// };

// export const auth = getAuthInstance();
// export const db = getDatabaseInstance();
export {};
