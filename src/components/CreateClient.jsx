import React, { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";

const CreateClient = () => {
  const [newClient, setNewClient] = useState("");
  const clientCollectionRef = collection(db, `clients`);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    await addDoc(clientCollectionRef, {
      name: newClient,
    });
    setNewClient("");
  };

  return (
    <form className="tag" onSubmit={handleCreateProject}>
      <input
        type="text"
        placeholder="create client"
        value={newClient}
        onChange={(e) => setNewClient(e.target.value)}
        style={{ height: "30px" }}
      />
      <button style={{ margin: 0 }}>+</button>
    </form>
  );
};

export default CreateClient;
