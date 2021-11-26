import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../firebase";

const UserList = ({ uid }) => {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("");
  const [newType, setNewType] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "users")), (data) => {
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    const getType = async () => {
      const userDocRef = doc(db, "users", `${uid}`);
      const docSnap = await getDoc(userDocRef);
      setType(docSnap.data().type);
      setNewType(docSnap.data().type);
    };
    getType();
    return () => unsub();
  }, [uid]);

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);
    const newFields = { type: newType };
    await updateDoc(userDoc, newFields);
  };

  const username = (email) => {
    const atPosition = email.indexOf("@");
    return email.slice(0, atPosition);
  };

  if (type === "admin") {
    return (
      <div>
        <h4>Users</h4>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h4>{username(user.email)} </h4>
              <form>
                <select
                  value={user.type}
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
                <button
                  className="new-task"
                  type="button"
                  onClick={() => {
                    updateUser(user.id);
                  }}
                >
                  ✓
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h4>This list is only accessible to admins</h4>
      </div>
    );
  }
};

export default UserList;
