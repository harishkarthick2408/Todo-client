import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import {
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";

const REDIRECT_FLAG = "auth:redirecting";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    let tokenRefreshInterval = null;
    let isMounted = true;

    const initAuth = async () => {
      setLoading(true);

      try {
        const result = await getRedirectResult(auth);
        if (result?.user && isMounted) {
          const token = await result.user.getIdToken();
          setUser(result.user);
          setIdToken(token);
          sessionStorage.removeItem(REDIRECT_FLAG);
          setLoading(false);
        }
      } catch (error) {
        console.error("Redirect result error:", error);
        sessionStorage.removeItem(REDIRECT_FLAG);
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
        setLoading(false);
      });

      tokenRefreshInterval = setInterval(async () => {
        if (auth.currentUser) {
          const token = await auth.currentUser.getIdToken(true);
          if (isMounted) setIdToken(token);
        }
      }, 55 * 60 * 1000);
    };

    initAuth();

    return () => {
      isMounted = false;
      unsubscribe();
      if (tokenRefreshInterval) clearInterval(tokenRefreshInterval);
    };
  }, []);

  const signInWithGoogle = async () => {
    sessionStorage.setItem(REDIRECT_FLAG, "1");
    await signInWithRedirect(auth, googleProvider);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setIdToken(null);
    sessionStorage.removeItem(REDIRECT_FLAG);
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
