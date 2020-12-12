import React, { useState } from 'react';
import './Chat.css';

import axios from './axios';

import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { InsertEmoticon, Mic } from '@material-ui/icons';

function Chat({ messages }) {

  const [input, setInput] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/api/v1/messages/new', {
      "message": input,
      "name": "Mart",
      "timestamp": new Date().toLocaleString(),
      "received": true
    });

    setInput('');
  }
  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map(message => {
          return (<p key={message._id} className={`chat__message ${message.received && "chat__reciever"}`}>
            <span className="chat__name"> {message.name} </span>
            {message.message}
            <span className="chat__timestamp"> {message.timestamp} </span>
          </p>)
        })}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat
