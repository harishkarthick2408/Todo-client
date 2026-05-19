import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import {
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    let tokenRefreshInterval = null;
    let timeoutId = null;
    let isMounted = true;
    let resolved = false;

    const resolveLoading = () => {
      if (resolved) return;
      resolved = true;
      if (timeoutId) clearTimeout(timeoutId);
      setLoading(false);
    };

    const initAuth = async () => {
      setLoading(true);

      timeoutId = setTimeout(() => {
        if (isMounted && !resolved) {
          console.warn("Auth init timed out");
          resolveLoading();
        }
      }, 5000);

      try {
        await setPersistence(auth, browserLocalPersistence);
        const result = await getRedirectResult(auth);
        if (result?.user && isMounted) {
          const token = await result.user.getIdToken();
          setUser(result.user);
          setIdToken(token);
        }
      } catch (error) {
        console.error("Redirect result error:", error);
      }

      if (!isMounted) return;

      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!isMounted) return;
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
        resolveLoading();
      });

      tokenRefreshInterval = setInterval(async () => {
        if (auth.currentUser && isMounted) {
          const token = await auth.currentUser.getIdToken(true);
          setIdToken(token);
        }
      }, 55 * 60 * 1000);
    };

    initAuth();

    return () => {
      isMounted = false;
      unsubscribe();
      if (timeoutId) clearTimeout(timeoutId);
      clearInterval(tokenRefreshInterval);
    };
  }, []);

  const signInWithGoogle = () => {
    return setPersistence(auth, browserLocalPersistence).then(() =>
      signInWithRedirect(auth, googleProvider)
    );
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
