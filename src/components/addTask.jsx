import React, { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";

const AddTasks = ({ uid }) => {
  const [newTask, setNewTask] = useState("");
  const taskCollectionRef = collection(db, `users/${uid}/tasks`);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await addDoc(taskCollectionRef, {
      description: newTask,
      duration: 0,
      isActive: false,
      createdAt: new Date().toLocaleString(),
    });
    setNewTask("");
  };

  return (
    <div>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="(no description)"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        ></input>
        <button className="new-task">Add</button>
      </form>
    </div>
  );
};

export default AddTasks;
