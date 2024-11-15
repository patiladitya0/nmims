// chatbot.js

import React, { useState } from 'react';
import axios from 'axios';
import "./chatbot.css"

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    setChatHistory((prev) => [...prev, { sender: 'chatbot-user-message', message: userInput }]);

    try {
      const response = await axios.post('/chatbot', { message: userInput });
      const botReply = response.data.reply;

      setChatHistory((prev) => [...prev, { sender: 'chatbot-bot-message', message: botReply }]);
    } catch (error) {
      console.error('Error:', error);
    }

    setUserInput('');
  };

  return (
    <div className="chatbot-main-container">
      <div className="chatbot-message-window">
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.sender}>
            <p>{chat.message}</p>
          </div>
        ))}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInputChange}
          placeholder="Ask about Safety and Security..."
          className="chatbot-input-field"
        />
        <button onClick={handleSendMessage} className="chatbot-send-button">Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
