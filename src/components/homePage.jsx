import React from "react";
import AddTasks from "./AddTask";
import LogoutBtn from "./LogoutBtn";
import TaskList from "./TaskList";
import UserList from "./UserList";
import CreateProject from "./CreateProject";
import CreateClient from "./CreateClient";

const HomePage = ({ email, uid }) => {
  const userEmail = String(email);
  return (
    <div>
      <nav>
        <h5>{userEmail}</h5>
        <LogoutBtn />
      </nav>
      <div className="container">
        <AddTasks uid={uid} />
        <CreateProject />
        <CreateClient />
        <TaskList uid={uid} />
        <UserList uid={uid} />
      </div>
    </div>
  );
};

export default HomePage;
