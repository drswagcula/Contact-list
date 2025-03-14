import React, { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import SelectedContact from "./components/SelectedContact";
import "./App.css";

const API_BASE_URL = "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com";

export default function App() {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(`${API_BASE_URL}/users`);
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`Failed to fetch contacts. Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Result:", result);
        setContacts(result);
      } catch (err) {
        setError(err);
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
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
        <ContactList
          contacts={contacts}
          setSelectedContactId={setSelectedContactId}
        />
      )}
    </>
  );
}