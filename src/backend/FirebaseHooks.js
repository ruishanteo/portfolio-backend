import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./Firebase";

const handleApiCall = async (func) => {
  return func
    .then((res) => res)
    .catch((err) => {
      alert(err);
      console.log("Error Code:", err.code, "Message:", err.message);
      throw err;
    });
};

const handleErrorMessage = (err) => {
  alert(err);
  console.log("Error Code:", err.code, "Message:", err.message);
  // throw err;
};

const logInWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password).catch(
    handleErrorMessage
  );
};

const logout = () => {
  return signOut(auth);
};

function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export {
  handleApiCall,
  handleErrorMessage,
  logInWithEmailAndPassword,
  logout,
  useAuth,
};
