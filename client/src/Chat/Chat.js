import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';

import axios from '../axios';

import './Chat.css';

import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';

function Chat({ username }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('message');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

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
          return (<p key={message._id} className={`chat__message ${(message.name === username) && "chat__reciever"}`}>
            <span className="chat__name"> {message.name} </span>
            {message.message}
            <span className="chat__timestamp"> {message.timestamp} </span>
          </p>)
        })}
        <div ref={messagesEndRef} />
      </div>

      <ChatFooter username={username}/>
    </div>
  )
}

export default Chat
