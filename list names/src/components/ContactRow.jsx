import React, { useState, useEffect } from "react";

const API_BASE_URL = "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com";

export default function SelectedContact({
  selectedContactId,
  setSelectedContactId,
}) {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${selectedContactId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch contact");
        }
        const result = await response.json();
        setContact(result);
      } catch (err) {
        setError(err);
        console.error("Error fetching contact:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchContact();
  }, [selectedContactId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {contact ? (
        <div>
          <h2>{contact.name}</h2>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <button onClick={() => setSelectedContactId(null)}>
            Back to List
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}