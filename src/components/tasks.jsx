import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import _ from "lodash";
import Timer from "./Timer";
import DeleteBtn from "./DeleteBtn";
import DuplicateBtn from "./DuplicateBtn";
import TotalHrsDay from "./TotalHrsDay";
import TotalHrsWk from "./TotalHrsWk";

const Tasks = ({ uid }) => {
  const [tasks, setTasks] = useState([]);

  let today = 0;
  let week = [];
  let thisWeek = 0;

  useEffect(() => {
    const docRef = collection(db, `users/${uid}/tasks`);
    const unsub = onSnapshot(query(docRef), (data) => {
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, [uid]);

  for (let i = 0; i < 7; i++) {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    const day = new Date(curr.setDate(first + i)).toLocaleDateString();
    week.push(day);
  }

  const totalDay = (date, duration) => {
    if (date === new Date().toLocaleDateString()) {
      today += duration;
    }
  };

  const totalWk = (date, duration) => {
    if (week.includes(date)) {
      thisWeek += duration;
    }
  };

  tasks.forEach((task) => totalDay(task.dateCreated, task.duration));
  tasks.forEach((task) => totalWk(task.dateCreated, task.duration));

  const getDay = (date) => {
    switch (new Date(date).getDay()) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      default:
        return "Saturday";
    }
  };

  return (
    <div>
      <TotalHrsDay total={today} />
      <TotalHrsWk total={thisWeek} />
      <ul className="task-list">
        {_.orderBy(_.uniqBy(tasks, "dateCreated"), ["timestamp"], ["desc"]).map(
          (task) => (
            <li key={task.id}>
              <h5>{`${getDay(task.dateCreated)}, ${task.dateCreated}`}</h5>
              <ul className="day-list">
                {_.orderBy(tasks, ["timestamp"], ["desc"]).map((daytask) =>
                  task.dateCreated === daytask.dateCreated ? (
                    <li key={daytask.id}>
                      <h5>{daytask.description}</h5>
                      <h5>{daytask.timestamp}</h5>
                      <h5>{daytask.project}</h5>
                      <h5>{daytask.client}</h5>
                      <div>
                        <Timer
                          duration={daytask.duration}
                          status={daytask.isActive}
                          docid={daytask.id}
                          uid={uid}
                        />
                        <DeleteBtn uid={uid} taskid={daytask.id} />
                        <DuplicateBtn
                          uid={uid}
                          description={daytask.description}
                          duration={daytask.duration}
                          project={daytask.project}
                          client={daytask.client}
                          isBillable={daytask.isBillable}
                        />
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Tasks;
