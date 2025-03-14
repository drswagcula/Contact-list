import React, { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import SelectedContact from "./components/SelectedContact";

const API_BASE_URL = "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com";

export default function App() {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/todos/1`);
        if (!response.ok) {
          throw new Error("Failed to fetch todo");
        }
        const json = await response.json();
        console.log("Todo: ", json);
      } catch (err) {
        setError(err);
        console.error("Error fetching todo:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {selectedContactId ? (
        <SelectedContact
          selectedContactId={selectedContactId}
          setSelectedContactId={setSelectedContactId}
        />
      ) : (
        <ContactList setSelectedContactId={setSelectedContactId} />
      )}
    </>
  );
}
