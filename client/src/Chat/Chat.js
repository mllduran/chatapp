import React, { useEffect, useRef } from 'react';
import './Chat.css';

import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';

function Chat({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className='chat'>

      <ChatHeader />

      <div className="chat__body">
        {messages.map(message => {
          return (<p key={message._id} className={`chat__message ${message.received && "chat__reciever"}`}>
            <span className="chat__name"> {message.name} </span>
            {message.message}
            <span className="chat__timestamp"> {message.timestamp} </span>
          </p>)
        })}
        <div ref={messagesEndRef} />
      </div>

      <ChatFooter />
    </div>
  )
}

export default Chat
