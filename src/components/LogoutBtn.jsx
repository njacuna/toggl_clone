import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const LogoutBtn = () => {
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

export default LogoutBtn;
