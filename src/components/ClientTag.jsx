import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { db } from "../firebase";

const ClientTag = ({ handleClient }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const docRef = collection(db, "clients");
    const unsub = onSnapshot(query(docRef), (data) => {
      setClients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  return (
    <label>
      client:{" "}
      <select value="none" onChange={handleClient}>
        <option value="none">none</option>
        {clients.map((client) => (
          <option key={client.id} value={client.name}>
            {client.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default ClientTag;
