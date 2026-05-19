import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import {
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        await getRedirectResult(auth);
      } catch (error) {
        console.error("Redirect result error:", error);
      }
    };

    handleRedirect();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          setUser(firebaseUser);
          setIdToken(token);
        } catch (error) {
          console.error("Token error:", error);
          setUser(null);
          setIdToken(null);
        }
      } else {
        setUser(null);
        setIdToken(null);
      }
      setLoading(false);
    });

    const tokenRefreshInterval = setInterval(async () => {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken(true);
        setIdToken(token);
      }
    }, 55 * 60 * 1000);

    return () => {
      unsubscribe();
      clearInterval(tokenRefreshInterval);
    };
  }, []);

  const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider);
  };

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
    return undefined;
  };

  return (
    <AuthContext.Provider
      value={{ user, idToken, loading, signInWithGoogle, signOut, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
