import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

import axios from './axios';

import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, []);

  useEffect(() => {
    var pusher = new Pusher('', {
      cluster: 'ap1'
    });

    var channel = pusher.subscribe('message');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body" >
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
