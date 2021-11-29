import React, { useState, useEffect } from "react";
import CreateClient from "./CreateClient";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const docRef = collection(db, `clients`);
    const unsub = onSnapshot(query(docRef), (data) => {
      setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);
  return (
    <React.Fragment>
      <CreateClient />
      <ul>
        {clients.map((client) => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ClientList;
