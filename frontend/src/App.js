// frontend/src/App.js
import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChatLog = [...chatLog, { role: "user", content: message }];
    setChatLog(newChatLog);
    setMessage("");

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setChatLog([...newChatLog, { role: "bot", content: data.response }]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🤖 Chatbot</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll", marginBottom: "10px" }}>
        {chatLog.map((msg, i) => (
          <div key={i}><strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "80%" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
