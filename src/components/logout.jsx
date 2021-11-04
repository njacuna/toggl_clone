import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Logout = () => {
  const googleSignout = () => {
    signOut(auth);
  };
  return (
    <div>
      <button className="logout" onClick={googleSignout}>
        Sign out
      </button>
    </div>
  );
};

export default Logout;
