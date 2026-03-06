import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  type ConfirmationResult,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  onAuthStateChanged,
  type RecaptchaVerifier,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, firebaseConfigured } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (preferRedirect?: boolean) => Promise<void>;
  sendPhoneCode: (phone: string, appVerifier: RecaptchaVerifier) => Promise<ConfirmationResult>;
  verifyPhoneCode: (confirmationResult: ConfirmationResult, code: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const subscribeUserToNewsletter = async (currentUser: User, source: string) => {
    if (!db) return;

    await setDoc(
      doc(db, 'newsletter_subscribers', currentUser.uid),
      {
        uid: currentUser.uid,
        email: currentUser.email ?? null,
        phoneNumber: currentUser.phoneNumber ?? null,
        source,
        weeklyNewsletter: true,
        subscribedAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signUp = async (email: string, password: string) => {
    if (!auth || !firebaseConfigured) {
      throw new Error('Firebase is not configured. Add VITE_FIREBASE_* values in .env.');
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await subscribeUserToNewsletter(cred.user, 'email_signup');
  };

  const login = async (email: string, password: string) => {
    if (!auth || !firebaseConfigured) {
      throw new Error('Firebase is not configured. Add VITE_FIREBASE_* values in .env.');
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async (preferRedirect = false) => {
    if (!auth || !firebaseConfigured) {
      throw new Error('Firebase is not configured. Add VITE_FIREBASE_* values in .env.');
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    if (preferRedirect) {
      await signInWithRedirect(auth, provider);
      return;
    }

    try {
      const cred = await signInWithPopup(auth, provider);
      const additional = getAdditionalUserInfo(cred);
      if (additional?.isNewUser) {
        await subscribeUserToNewsletter(cred.user, 'google_signup');
      }
    } catch {
      await signInWithRedirect(auth, provider);
    }
  };

  const sendPhoneCode = async (phone: string, appVerifier: RecaptchaVerifier) => {
    if (!auth || !firebaseConfigured) {
      throw new Error('Firebase is not configured. Add VITE_FIREBASE_* values in .env.');
    }
    return signInWithPhoneNumber(auth, phone, appVerifier);
  };

  const verifyPhoneCode = async (confirmationResult: ConfirmationResult, code: string) => {
    if (!firebaseConfigured) {
      throw new Error('Firebase is not configured. Add VITE_FIREBASE_* values in .env.');
    }
    const cred = await confirmationResult.confirm(code);
    const additional = getAdditionalUserInfo(cred);
    if (additional?.isNewUser) {
      await subscribeUserToNewsletter(cred.user, 'phone_signup');
    }
  };

  const logout = async () => {
    if (!auth || !firebaseConfigured) return;
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    if (!auth || !firebaseConfigured) {
      throw new Error('Firebase is not configured. Add VITE_FIREBASE_* values in .env.');
    }
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, login, loginWithGoogle, sendPhoneCode, verifyPhoneCode, resetPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
