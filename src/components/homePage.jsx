import React from "react";
import AddTasks from "./addTask";
import Logout from "./logout";
import Tasks from "./tasks";

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
        <Tasks uid={uid} />
      </div>
    </div>
  );
};

export default HomePage;
