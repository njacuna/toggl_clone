import React, { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";

const CreateProject = () => {
  const [newProject, setNewProject] = useState("");
  const projectCollectionRef = collection(db, `projects`);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    await addDoc(projectCollectionRef, {
      name: newProject,
    });
    setNewProject("");
  };

  return (
    <form className="tag" onSubmit={handleCreateProject}>
      <input
        type="text"
        placeholder="create project"
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
      />
      <button>+</button>
    </form>
  );
};

export default CreateProject;
