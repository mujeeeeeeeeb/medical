import { useState, useEffect, useRef } from "react";
import "./Chat.css";

export default function Chat({ user, recipient }) {
  // Mock messages array
  const [messages, setMessages] = useState([
    { sender: "Doctor", text: "Hello! How are you feeling today?" },
    { sender: "Patient", text: "I'm feeling okay, thank you!" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: user, text: newMessage }]);
    setNewMessage("");
  };

  // Allow pressing Enter to send
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <h3>Chat with {recipient}</h3>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === user ? "me" : "other"}`}
          >
            <span className="sender">{msg.sender}:</span> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}