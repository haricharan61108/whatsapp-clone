import React, { useState } from "react";
import axios from "axios";

const SendMessage = ({ user }) => {
  const [recieverUsername, setRecieverUsername] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const sendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:3000/messages/send", {
        senderUsername: user.username,
        recieverUsername,
        content,
      });

      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setContent("");
        setRecieverUsername(""); 
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Error sending message.");
    }
  };

  return (
    <div>
      <h2>Send Message</h2>
      <input
        type="text"
        placeholder="Reciever Username"
        value={recieverUsername}
        onChange={(e) => setRecieverUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={sendMessage}>Send Msg</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SendMessage;
