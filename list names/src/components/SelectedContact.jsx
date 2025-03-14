import React, { useState, useEffect } from "react";

const API_BASE_URL = "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com";

export default function SelectedContact({ selectedContactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedContactId) return;

    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/users/${selectedContactId}`)
      .then(response => {
        if (!response.ok) {
          console.error(`Fetch failed with status: ${response.status}`);
          throw new Error(`Failed to fetch contact. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setContact(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        console.error("Error fetching contact:", err);
        setLoading(false);
      });
  }, [selectedContactId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!contact) return <div>Contact not found.</div>;

  return (
    <div>
      <h2>{contact.name}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <button onClick={() => setSelectedContactId(null)}>Back to List</button>
    </div>
  );
}