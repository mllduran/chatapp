import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import './Login.css';

function Login({handleSignIn}) {
  const [username, setUsername] = useState([]);

  const signIn = (e) => {
    e.preventDefault();
    handleSignIn(username);
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://scontent.fmnl6-1.fna.fbcdn.net/v/t1.15752-0/cp0/q90/p64x64/110308782_580891779251735_2574782592702349246_n.jpg?_nc_cat=102&ccb=2&_nc_sid=02e273&_nc_ohc=0211mlma940AX-zCCF2&_nc_ht=scontent.fmnl6-1.fna&tp=27&oh=d18d64c2e6063f3308c576056d5a19ef&oe=5FFB0CE3"
          alt=""
        />
        <div className="login__text">
          <form>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              placeholder="name" />
            <Button type="submit" onClick={signIn}>Join</Button>
          </form>
        </div>


      </div>
    </div>
  )
}

export default Login
