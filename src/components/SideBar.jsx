import React from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

const SideBar = ({ email }) => {
  const userEmail = String(email);
  return (
    <div className="sidebar">
      <h5 className="username">{userEmail}</h5>
      <Link className="sidebar-item" to={"/tasklist"}>
        Timer
      </Link>
      <Link className="sidebar-item" to={"/team"}>
        Team
      </Link>
      <Link className="sidebar-item" to={"/projects"}>
        Projects
      </Link>
      <Link className="sidebar-item" to={"/clients"}>
        Clients
      </Link>
      <Link className="sidebar-item" to={"/invite"}>
        Invite someone!
      </Link>
      <LogoutBtn className="bottom" />
    </div>
  );
};

export default SideBar;
