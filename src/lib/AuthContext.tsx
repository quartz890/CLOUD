import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, onSnapshot, setDoc, Unsubscribe } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { ensureUserProfile } from './progressService';

export interface UserProfileData {
  id: string;
  email: string;
  displayName?: string;
  createdAt?: string;
  lastActiveAt?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfileData | null;
  displayName: string;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserDisplayName: (name: string) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Compute friendly display name with precedence: Firestore profile -> Auth user -> Email prefix -> 'Learner'
  const computedDisplayName = React.useMemo(() => {
    if (userProfile?.displayName && userProfile.displayName.trim().length > 0) {
      return userProfile.displayName.trim();
    }
    if (user?.displayName && user.displayName.trim().length > 0) {
      return user.displayName.trim();
    }
    if (user?.email) {
      const prefix = user.email.split('@')[0];
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    return 'Learner';
  }, [userProfile?.displayName, user?.displayName, user?.email]);

  useEffect(() => {
    let profileUnsub: Unsubscribe | null = null;

    const authUnsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (profileUnsub) {
        profileUnsub();
        profileUnsub = null;
      }

      if (currentUser) {
        // Setup real-time listener for Firestore user profile
        const userDocRef = doc(db, 'users', currentUser.uid);
        profileUnsub = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUserProfile(docSnap.data() as UserProfileData);
            } else {
              setUserProfile(null);
            }
          },
          (err) => {
            console.warn('Profile sync listener notice:', err);
          }
        );

        if (currentUser.email) {
          try {
            await ensureUserProfile(currentUser.uid, currentUser.email);
          } catch (err) {
            console.warn('Could not sync user profile to Firestore:', err);
          }
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      authUnsubscribe();
      if (profileUnsub) {
        profileUnsub();
      }
    };
  }, []);

  const formatAuthErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const code = (error as { code: string }).code;
      switch (code) {
        case 'auth/operation-not-allowed':
          return 'Email/Password sign-in is not enabled in Firebase Console. Go to Firebase Console > Authentication > Sign-in method, click "Email/Password", and enable it.';
        case 'auth/email-already-in-use':
          return 'An account with this email address already exists. Please log in instead.';
        case 'auth/invalid-email':
          return 'Please enter a valid email address.';
        case 'auth/weak-password':
          return 'Password must be at least 6 characters.';
        case 'auth/user-not-found':
          return 'No account was found with this email. Please create an account first.';
        case 'auth/wrong-password':
          return 'Incorrect password. Please verify your credentials and try again.';
        case 'auth/invalid-credential':
          return 'Invalid email or password. Please verify your details.';
        case 'auth/too-many-requests':
          return 'Access temporarily disabled due to many failed login attempts. Please try again in a few moments.';
        case 'auth/network-request-failed':
          return 'Network connection error. Please check your internet connection and try again.';
        default:
          return (error as { message?: string }).message || 'Authentication failed. Please try again.';
      }
    }
    return String(error);
  };

  const login = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), pass);
      setUser(userCredential.user);
      if (userCredential.user?.email) {
        ensureUserProfile(userCredential.user.uid, userCredential.user.email).catch((err) => {
          console.warn('Could not sync user profile to Firestore:', err);
        });
      }
    } catch (err) {
      const msg = formatAuthErrorMessage(err);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const signup = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      setUser(userCredential.user);
      if (userCredential.user?.email) {
        ensureUserProfile(userCredential.user.uid, userCredential.user.email).catch((err) => {
          console.warn('Could not sync user profile to Firestore:', err);
        });
      }
    } catch (err) {
      const msg = formatAuthErrorMessage(err);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      const msg = formatAuthErrorMessage(err);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const updateUserDisplayName = async (name: string) => {
    if (!auth.currentUser) {
      throw new Error('No authenticated user found.');
    }
    const cleanName = name.trim().slice(0, 100);
    if (!cleanName) {
      throw new Error('Display name cannot be empty.');
    }

    const currentUid = auth.currentUser.uid;
    const currentEmail = auth.currentUser.email || '';

    // 1. Update Firebase Auth Profile
    try {
      await updateProfile(auth.currentUser, {
        displayName: cleanName,
      });
    } catch (err) {
      console.warn('Auth displayName update notice:', err);
    }

    // 2. Update Firestore user document
    const userDocRef = doc(db, 'users', currentUid);
    try {
      await setDoc(
        userDocRef,
        {
          id: currentUid,
          email: currentEmail,
          displayName: cleanName,
          lastActiveAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${currentUid}`, false);
    }

    // 3. Update local state immediately
    setUserProfile((prev) => ({
      id: currentUid,
      email: currentEmail,
      createdAt: prev?.createdAt || new Date().toISOString(),
      displayName: cleanName,
      lastActiveAt: new Date().toISOString(),
    }));
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        displayName: computedDisplayName,
        loading,
        login,
        signup,
        logout,
        updateUserDisplayName,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

