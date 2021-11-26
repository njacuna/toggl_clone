import React from "react";
import { db } from "../firebase";
import { doc, deleteDoc } from "@firebase/firestore";

const DeleteBtn = ({ uid, taskid }) => {
  const deleteTask = async (id) => {
    const userDoc = doc(db, `users/${uid}/tasks`, id);
    await deleteDoc(userDoc);
  };

  return (
    <button
      className="li-button"
      onClick={() => {
        deleteTask(taskid);
      }}
    >
      x
    </button>
  );
};

export default DeleteBtn;
