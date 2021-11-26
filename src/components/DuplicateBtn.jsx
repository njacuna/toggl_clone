import React from "react";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase";

const DuplicateBtn = ({
  uid,
  description,
  duration,
  project,
  client,
  isBillable,
}) => {
  const duplicateTask = async (description, duration) => {
    const docRef = collection(db, `users/${uid}/tasks`);
    await addDoc(docRef, {
      userId: uid,
      description,
      duration,
      isActive: false,
      timestamp: Date.parse(new Date().toLocaleString()) / 1000,
      dateCreated: new Date().toLocaleDateString(),
      project,
      client,
      isBillable,
    });
  };

  return (
    <button
      className="li-button"
      onClick={() => {
        duplicateTask(description, duration);
      }}
    >
      D
    </button>
  );
};

export default DuplicateBtn;
