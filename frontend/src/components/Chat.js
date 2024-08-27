import React from "react";
import SendMessage from "./SendMessage";
import MessageList from "./MessageList";

const Chat=({user})=> {
    return (
        <div>
            <h2>Welcome,{user.username}!</h2>
            <SendMessage user={user} />
            <MessageList user={user} />
        </div>
    )
}

export default Chat;