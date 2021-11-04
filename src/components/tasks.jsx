import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  addDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import Timer from "./timer";
import TotalHours from "./totalHours";

const Tasks = ({ uid }) => {
  const [tasks, setTasks] = useState([]);

  const docRef = collection(db, `users/${uid}/tasks`);
  const q = query(docRef);

  useEffect(() => {
    const getSnapshot = onSnapshot(q, (data) => {
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => getSnapshot();
  }, []);

  const deleteTask = async (id) => {
    const userDoc = doc(db, `users/${uid}/tasks`, id);
    await deleteDoc(userDoc);
  };

  const duplicateTask = async (description, duration) => {
    await addDoc(docRef, {
      description,
      duration,
      isActive: false,
      createdAt: new Date().toLocaleString(),
    });
  };

  let total = 0;
  tasks.map((task) => (total += task.duration));

  return (
    <div>
      <TotalHours total={total} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h4>{task.description}</h4>
            <div>
              <Timer
                duration={task.duration}
                status={task.isActive}
                docid={task.id}
                uid={uid}
              />
              <button
                className="li-button"
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                x
              </button>
              <button
                className="li-button"
                onClick={() => {
                  duplicateTask(task.description, task.duration);
                }}
              >
                D
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
