import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import app from '../firebase configuration/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = useMemo(() => new GoogleAuthProvider(), []);
  const githubProvider = useMemo(() => new GithubAuthProvider(), []);

  //* Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //* Login / SignIn
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //* Update User Information
  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  //* Password Reset
  const passwordReset = (userEmail) => {
    return sendPasswordResetEmail(auth, userEmail);
  };

  //* Google Sign In
  const googleSignIn = useCallback(() => {
    return signInWithPopup(auth, googleProvider);
  }, [googleProvider]);

  //* Github Sign In
  const githubSignIn = useCallback(() => {
    return signInWithPopup(auth, githubProvider);
  }, [githubProvider]);

  //* LogOut / Sign Out
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = useMemo(
    () => ({
      user,
      loading,
      createUser,
      signIn,
      updateUser,
      passwordReset,
      googleSignIn,
      githubSignIn,
      logOut,
    }),
    [user, loading, googleSignIn, githubSignIn]
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
