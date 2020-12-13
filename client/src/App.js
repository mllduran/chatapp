import React, { useState } from 'react';

import './App.css';
import Chat from './Chat/Chat';
import Login from './Login/Login'
import Sidebar from './Sidebar/Sidebar';

function App() {
  const [username, setUser] = useState();

  const handleSignIn = (username) => {
    setUser(username);
  };

  return (
    <div className="app">
      <div className="app__body" >
        {!username ? (
          <Login handleSignIn={handleSignIn} />
        ) : (
          <>
            <Sidebar />
            <Chat username={username}/>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
