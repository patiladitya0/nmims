import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    // Display the user's message in the chat window
    setChatHistory((prev) => [...prev, { sender: 'user', message: userInput }]);

    try {
      // Send message to backend (Node.js server)
      const response = await axios.post('http://localhost:5001/chatbot', { message: userInput });

      // Get the chatbot's reply
      const botReply = response.data.reply;

      // Display the bot's response
      setChatHistory((prev) => [...prev, { sender: 'bot', message: botReply }]);
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear the input field
    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.sender}>
            <p>{chat.message}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleUserInputChange}
        placeholder="Ask about Safety and Security..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
