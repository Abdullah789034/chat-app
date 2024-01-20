import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/ChatPage.css';

const ChatPage = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [cmessages, setcMessages] = useState([]); 
  let usName = localStorage.getItem('userName');
  const [userNum,setuserNum] = useState(0);

  useEffect(() => {
    socket.on('usernum',(n)=>{
      setuserNum(n);
    },[socket]);
    
    
    socket.on('recieve_msg', (data) => {
      setcMessages([...cmessages, { user: data.usName, text: data.message }]);
    });
  }, [socket, cmessages]);

  const navigate = useNavigate();

  const handleSendMessage = () => {
    const sentMessage = { user: usName, text: message };

    setcMessages([...cmessages, sentMessage]);
    socket.emit('send_message', { usName: usName, message: message });

    setMessage('');
  };

  const handleLeave = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="chat-body-container">
    <div>
      <h2>Chat Members = {userNum}</h2>
    </div>
      <div className="chat-area">
        {/* Display chat messages */}
        {cmessages.map((msg, index) => (
          <div
            key={index}
            className={msg.user === usName ? 'message sent' : 'message received'}
          >
            <strong>{msg.user === usName ? 'You' : msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="message-send-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <button className="leave-chat-button" onClick={handleLeave}>
        Leave Chat
      </button>
    </div>
  );
};

export default ChatPage;
