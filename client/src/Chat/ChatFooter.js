import React, {useState} from 'react';

import { InsertEmoticon, Mic } from '@material-ui/icons';

import axios from '../axios';

function ChatFooter() {
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
    <div className="chat__footer">
      <InsertEmoticon />
      <form>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
        <button onClick={sendMessage} type="submit">Send a message</button>
      </form>
      <Mic />
    </div>
  )
}

export default ChatFooter
