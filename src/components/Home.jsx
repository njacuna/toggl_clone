import React from "react";
// import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import UserList from "./UserList";
// import CreateProject from "./CreateProject";
// import CreateClient from "./CreateClient";
import Mailer from "./Mailer";
import SideBar from "./SideBar";
import { Switch, Route } from "react-router-dom";
import ProjectList from "./ProjectList";
import ClientList from "./ClientList";

const Home = ({ email, uid }) => {
  return (
    <div>
      <div className="container">
        <SideBar email={email} />
        <Switch>
          <Route path="/tasklist" exact render={() => <TaskList uid={uid} />} />
          <Route path="/team" exact render={() => <UserList uid={uid} />} />
          <Route path="/projects" exact component={ProjectList} />
          <Route path="/clients" exact component={ClientList} />
          {/* <Route path="/invite" exact component={Mailer} /> */}
          <Route path="/invite" exact render={() => <Mailer email={email} />} />
        </Switch>
        {/* <CreateProject />
        <CreateClient /> */}
      </div>
    </div>
  );
};

export default Home;
