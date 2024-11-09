import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './chat.css';

const socket = io("https://cap-server-nv40.onrender.com");

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("Anon");
  const chatBoxRef = useRef(null);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('https://cap-server-1.onrender.com/api/user/account', config);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const initializeUserData = async () => {
      await fetchUserData();
      if (userData && userData.fullName) {
        setName(userData.fullName);
      }
    };

    initializeUserData();

    socket.on("chat message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => socket.off("chat message");
  }, [userData]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat message", { name, message, color: generateRandomColor() });
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="chat-container">
      <div id="chatBox" className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <p key={index} className="chat-message">
            <strong style={{ color: msg.color }}>{msg.name}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">Send</button>
      </form>
    </div>
  );
}
