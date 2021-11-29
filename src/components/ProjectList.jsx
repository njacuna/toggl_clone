import React, { useEffect, useState } from "react";
import CreateProject from "./CreateProject";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const docRef = collection(db, `projects`);
    const unsub = onSnapshot(query(docRef), (data) => {
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);
  return (
    <React.Fragment>
      <CreateProject />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ProjectList;
