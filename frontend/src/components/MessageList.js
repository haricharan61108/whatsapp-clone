
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageList = ({ user }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/messages/${user.username}`);
                setMessages(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        fetchMessages();
    }, [user.username]);

    return (
        <div>
            <h3>Messages Received:</h3>
            {messages.length > 0 ? (
                messages.map((message, index) => (
                    <div key={index}>
                        <strong>From: {message.senderUsername}</strong>
                        <p>{message.content}</p>
                    </div>
                ))
            ) : (
                <p>No messages found.</p>
            )}
        </div>
    );
};

export default MessageList;
