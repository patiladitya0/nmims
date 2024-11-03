import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:5001"); // Ensure this matches your backend URL and port

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("Anon");

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token in the Authorization header
        },
      };

      // Make API call to fetch user data
      const response = await axios.get('http://localhost:5001/api/user/account', config); // Adjust with your actual API endpoint
      setUserData(response.data); // Set the fetched data to the state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Fetch user data and set the user's name
    const initializeUserData = async () => {
      await fetchUserData();
      if (userData && userData.fullName) {
        setName(userData.fullName);
      }
    };

    initializeUserData();

    // Listen for incoming chat messages
    socket.on("chat message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up the socket connection
    return () => socket.off("chat message");
  }, [userData]); // Add userData as a dependency to re-run if it changes

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Send the message along with the user's name
      socket.emit("chat message", { name, message });
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div>
      <div id="chatBox">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.name}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
