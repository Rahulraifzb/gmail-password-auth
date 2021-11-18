import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/init-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider
} from "firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  function updateUserEmail(email) { 
    return updateEmail(currentUser,email);
  }
  function updateUserPassword(password) {
    return updatePassword(currentUser,password);
  }

  const logout = () => {
    return signOut(auth);
  };

  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth,email,{
      url: `http://localhost:3000/login`,
    })
  }

  const resetPassword = (oobCode,newPassword) => {
    return confirmPasswordReset(auth,oobCode,newPassword)
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth,provider)
  }
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider()
    return signInWithPopup(auth,provider)
  }
  const signInWithGithub = () => {
    const provider = new GithubAuthProvider()
    return signInWithPopup(auth,provider)
  }

  const value = {
    currentUser,
    signUp,
    signIn,
    logout,
    updateUserEmail,
    updateUserPassword,
    forgetPassword,
    resetPassword,
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
