/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { PropTypes } from "prop-types";
import { createContext, useEffect, useState } from "react";
import app from "../services/firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  //console.log(auth);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      let userEmail = currentUser?.email || user?.email;
      if (currentUser) {
        const loggedUser = {
          email: currentUser?.email,
        };
        axios
          .post(`${process.env.REACT_APP_URL}/jwt`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            // console.log("jwt:- ", res.data);
          })
          .then((err) => {
            // console.log(err);
          });
      } else {
        axios.post(`${process.env.REACT_APP_URL}/logout`, userEmail, {
          withCredentials: true,
        });
      }
    });
    return () => unSubscribe();
  }, [auth, user]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const profileUpdate = (username, url) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: url,
    });
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const logOut = () => {
    setLoading(true);

    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    googleLogin,
    signInUser,
    logOut,
    profileUpdate,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
