import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import LoginBtn from "./components/LoginBtn";
import Home from "./components/Home";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        return setSignedIn(true);
      }
      setSignedIn(false);
    });
  }, []);

  useEffect(() => {
    const doesExist = async () => {
      const docRef = doc(db, "users", `${userData.uid}`);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", `${userData.uid}`), {
          email: userData.email,
          type: "user",
        });
      }
    };
    if (signedIn === true) {
      doesExist();
    }
  });

  return (
    <Router>
      <Switch>
        {signedIn === true ? (
          <Route
            path="/"
            render={() => <Home email={userData.email} uid={userData.uid} />}
          />
        ) : (
          <Route path="/" component={LoginBtn} />
        )}
      </Switch>
    </Router>
  );
}

export default App;
