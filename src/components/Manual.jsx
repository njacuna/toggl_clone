import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import moment from "moment";

const Manual = () => {
  const [dateState, setDateState] = useState(new Date());

  const changeDate = (e) => {
    setDateState(e);
  };

  // console.log(dateState.toLocaleDateString());
  // console.log(dateState.toLocaleString());
  // console.log(Date.parse(dateState.toLocaleString()) / 1000);
  // console.log(Date.parse("11/26/2021, 13:26:12".toLocaleString()) / 1000);
  // TODO calendar, email invite, and non stop timer

  return (
    <Calendar value={dateState} onChange={changeDate} />
    // <div>
    //   <p>
    //     Current selected date is{" "}
    //     <b>{moment(dateState).format("MMMM Do YYYY")}</b>
    //   </p>
    // </div>
  );
};

export default Manual;
