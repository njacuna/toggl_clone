import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import Login from "./components/login";
import HomePage from "./components/homePage";

import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserData(user);
      return setSignedIn(true);
    }
    setSignedIn(false);
  });

  const uid = userData.uid;

  const addUserDoc = async () => {
    await setDoc(doc(db, "users", uid), {
      email: userData.email,
      type: "basic",
    });
  };

  if (signedIn === true) {
    addUserDoc();
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            render={() => (
              <HomePage email={userData.email} uid={userData.uid} />
            )}
          />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
