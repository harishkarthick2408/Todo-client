import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isMounted) return;
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setUser(firebaseUser);
        setIdToken(token);
      } else {
        setUser(null);
        setIdToken(null);
      }
      setLoading(false);
    });
    return () => { isMounted = false; unsubscribe(); };
  }, []);

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setIdToken(null);
  };

  const refreshToken = async () => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken(true);
      setIdToken(token);
      return token;
    }
  };

  return (
    <AuthContext.Provider value={{ user, idToken, loading, signInWithGoogle, signOut, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};