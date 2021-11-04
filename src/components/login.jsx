import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const googleSignin = () => {
    const provider = new GoogleAuthProvider(auth);
    signInWithPopup(auth, provider);
  };
  return (
    <div>
      <button className="logout" onClick={googleSignin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
