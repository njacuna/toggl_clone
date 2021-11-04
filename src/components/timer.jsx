import React, { useState, useRef } from "react";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";

const Timer = ({ duration, status, uid, docid }) => {
  const [seconds, setSeconds] = useState(duration);
  const [isActive, setIsActive] = useState(status);
  const countRef = useRef(null);

  const taskDocRef = doc(db, `users/${uid}/tasks`, `${docid}`);

  const toggl = () => {
    if (isActive) {
      setIsActive(!isActive);
      clearInterval(countRef.current);
    } else {
      setIsActive(!isActive);
      countRef.current = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }
  };

  const updateDuration = async (seconds) => {
    await updateDoc(taskDocRef, {
      duration: seconds,
      isActive,
    });
  };

  updateDuration(seconds);

  const symbol = isActive ? "◼" : "▶";

  return (
    <span>
      {formatTime(duration)}{" "}
      <button className="li-button" onClick={toggl}>
        {symbol}
      </button>
    </span>
  );
};

const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours}:${getMinutes}:${getSeconds}`;
};

export default Timer;
