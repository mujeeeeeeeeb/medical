import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import './DoctorDashboardChat.css';

const SOCKET_SERVER_URL = "http://localhost:4000"; // Change this to your server URL

const DoctorDashboardChat = ({ sender, recipient }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatWindowRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    // Connect to socket server
    socketRef.current = io(SOCKET_SERVER_URL);

    // Join a room based on sender and recipient to isolate chat
    const room = [sender, recipient].sort().join('_');
    socketRef.current.emit('join_room', room);

    // Listen for incoming messages
    socketRef.current.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [sender, recipient]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = {
      id: Date.now(),
      sender,
      text: input.trim(),
      recipient,
      timestamp: new Date().toISOString(),
    };
    // Emit message to server
    socketRef.current.emit('send_message', newMessage);
    // Add message locally
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map(({ id, sender: msgSender, text }) => (
          <div
            key={id}
            className={`chat-message ${msgSender === sender ? 'sent' : 'received'}`}
          >
            <div className="chat-sender">{msgSender === sender ? 'You' : msgSender === 'doctor' ? 'Doctor' : 'Patient'}</div>
            <div className="chat-bubble">{text}</div>
          </div>
        ))}
      </div>
      <div className="chat-input-row">
        <textarea
          className="chat-typing-input"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
        />
        <button className="chat-send-btn" onClick={handleSend} aria-label="Send message">
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboardChat;