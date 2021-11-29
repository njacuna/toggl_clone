import React, { useState, useEffect } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";
import ProjectTag from "./ProjectTag";
import ClientTag from "./ClientTag";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CreateTask = ({ uid }) => {
  const [newTask, setNewTask] = useState("");
  const [project, setProject] = useState("");
  const [client, setClient] = useState("");
  const [isBillable, setIsBillable] = useState(false);
  const [duration, setDuration] = useState(0);
  const [dateCreated, setDateCreated] = useState(
    new Date().toLocaleDateString()
  );
  const [timestamp, setTimestamp] = useState(
    Date.parse(new Date().toLocaleString()) / 1000
  );
  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:00:00");
  const [dateState, setDateState] = useState(new Date());
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const changeDate = (e) => {
    setDateState(e);
  };

  const taskCollectionRef = collection(db, `users/${uid}/tasks`);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await addDoc(taskCollectionRef, {
      userId: uid,
      description: newTask,
      duration: duration,
      isActive: false,
      timestamp: timestamp,
      dateCreated: dateCreated,
      project,
      client,
      isBillable,
    });
    setNewTask("");
    setProject("");
    setClient("");
    setIsBillable(false);
    setStartTime("00:00:00");
    setEndTime("00:00:00");
    setDateState(new Date());
  };

  const handleChange = () => {
    setIsBillable(!isBillable);
  };

  useEffect(() => {
    const getDuration = (time) => {
      const hours = parseInt(time.substring(0, 2));
      const minutes = parseInt(time.substring(3, 5));
      const seconds = parseInt(time.substring(6, 8));
      return seconds + minutes * 60 + hours * 3600;
    };
    setDuration(getDuration(endTime) - getDuration(startTime));
    setDateCreated(dateState.toLocaleDateString());
    setTimestamp(
      Date.parse(dateState.toLocaleDateString() + " " + startTime) / 1000
    );
  }, [endTime, startTime, dateState]);

  console.log(dateState);

  return (
    <form onSubmit={handleCreateTask} className="create-task">
      <input
        type="text"
        placeholder="(no description)"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <div className="col-2">
        <ProjectTag handleProject={(e) => setProject(e.target.value)} />
        <ClientTag handleClient={(e) => setClient(e.target.value)} />
        <label>
          billable:{" "}
          <input type="checkbox" checked={isBillable} onChange={handleChange} />
        </label>
        <label>
          start:{" "}
          <input
            type="text"
            value={startTime}
            placeholder="00:00:00"
            onChange={(e) => setStartTime(e.target.value)}
            className="time"
            onFocus={onFocus}
          />
          <p>date: {dateState.toLocaleDateString()}</p>
        </label>
        <label>
          stop:{" "}
          <input
            type="text"
            value={endTime}
            placeholder="00:00:00"
            onChange={(e) => setEndTime(e.target.value)}
            className="time"
          />
        </label>
        <button className="new-task">Add</button>
      </div>
      <Calendar
        value={dateState}
        onChange={changeDate}
        onClickDay={onBlur}
        className={focused ? "visible" : "hidden"}
      />
    </form>
  );
};

export default CreateTask;
