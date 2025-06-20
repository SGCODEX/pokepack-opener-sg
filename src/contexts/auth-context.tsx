
"use client";

import type { User } from 'firebase/auth';
import { auth } from '@/lib/firebase-config';
import { onAuthStateChanged, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // Not needed for redirect on sign out anymore

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // const router = useRouter(); // Not needed for redirect on sign out anymore

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // User will be set by onAuthStateChanged.
      // Navigation after sign-in will be handled by the page calling this, or by useEffect on pages watching user state.
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      // Handle error (e.g., show a toast message)
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // Removed redirect to /login
      // User state will update via onAuthStateChanged, pages can react accordingly.
    } catch (error) {
      console.error("Error signing out: ", error);
      // Handle error
    }
  };

  const value = { user, loading, signInWithGoogle, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
