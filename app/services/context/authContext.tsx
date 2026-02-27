import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, UserCredential } from 'firebase/auth';
import { type Teacher } from '~/types/teacher';

interface AuthContextType {
  user: User | null;
  teachers: Teacher[] | null;
  login: (email: string, password: string) => Promise<UserCredential | void>;
  signup: (email: string, password: string, name: string) => Promise<UserCredential | void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [teachers, setTeachers] = useState<Teacher[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    let isCurrent = true;
    let unsubscribeAuth: (() => void) | null = null;
    let unsubscribeTeachers: (() => void) | null = null;
    const init = async () => {
      try {
        // ✅ УСІ Firebase модулі динамічно
        const firebase = await import('firebase/app');
        const authMod = await import('firebase/auth');
        const dbMod = await import('firebase/database');
        const { initializeApp } = firebase;
        const { getAuth, onAuthStateChanged, signOut } = authMod;
        const { getDatabase, ref, onValue } = dbMod;

        const config = {
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APP_ID,
          databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        };

        const app = initializeApp(config);
        const authInstance = getAuth(app);
        const dbInstance = getDatabase(app);

        // Auth
        unsubscribeAuth = onAuthStateChanged(authInstance, u => {
          if (isCurrent) setUser(u);
        });

        // Teachers
        const teachersRef = ref(dbInstance, 'teachers');
        unsubscribeTeachers = onValue(teachersRef, snap => {
          if (isCurrent) {
            setTeachers(snap.val() ? Object.values(snap.val()) : []);
          }
        });
      } catch (e) {
        console.error(e);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    init();

    return () => {
      isCurrent = false;
      unsubscribeAuth?.();
      unsubscribeTeachers?.();
    };
  }, []);

  // Методи — динамічні async
  const login = async (email: string, password: string) => {
    try {
      const firebaseAuth = await import('firebase/auth');
      const { signInWithEmailAndPassword, getAuth } = firebaseAuth;

      const app = (await import('firebase/app')).getApps()[0];
      const authInstance = getAuth(app);

      await signInWithEmailAndPassword(authInstance, email, password);
    } catch (error: any) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const firebaseAuth = await import('firebase/auth');
      const { createUserWithEmailAndPassword, updateProfile, getAuth } = firebaseAuth;

      const app = (await import('firebase/app')).getApps()[0];
      const authInstance = getAuth(app);

      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      await updateProfile(userCredential.user, { displayName: name });
    } catch (error: any) {
      console.error('Register error:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const firebaseAuth = await import('firebase/auth');
      const { signOut, getAuth } = firebaseAuth;

      const app = (await import('firebase/app')).getApps()[0];
      const authInstance = getAuth(app);

      await signOut(authInstance);
    } catch (error: any) {
      console.error('Logout error:', error.message);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    teachers,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
