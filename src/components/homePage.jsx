import React from "react";
import AddTasks from "./addTask";
import Logout from "./logout";
import Tasks from "./tasks";
import Type from "./type";

const HomePage = ({ email, uid }) => {
  const userEmail = String(email);
  return (
    <div>
      <nav>
        <h5>{userEmail}</h5>
        <Logout />
      </nav>
      <div className="container">
        <AddTasks uid={uid} />
        <Type uid={uid} />
        <Tasks uid={uid} />
      </div>
    </div>
  );
};

export default HomePage;
