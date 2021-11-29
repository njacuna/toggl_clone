import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { db } from "../firebase";

const ProjectTag = ({ handleProject }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const docRef = collection(db, "projects");
    const unsub = onSnapshot(query(docRef), (data) => {
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  return (
    <label>
      project:{" "}
      <select value="none" onChange={handleProject}>
        <option value="none">none</option>
        {projects.map((project) => (
          <option key={project.id} value={project.name}>
            {project.name}
          </option>
        ))}
      </select>{" "}
    </label>
  );
};

export default ProjectTag;
