import React, { useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";

const Type = ({ uid }) => {
  const [newType, setNewType] = useState("");
  const userDocRef = doc(db, "users", `${uid}`);

  const updateType = async (e) => {
    e.preventDefault();
    await setDoc(
      userDocRef,
      {
        type: newType,
      },
      { merge: true }
    );
    setNewType(newType);
  };

  return (
    <div>
      <form onSubmit={updateType}>
        <label>
          Select user access:
          <select value={newType} onChange={(e) => setNewType(e.target.value)}>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </label>
        <button className="new-task" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default Type;
