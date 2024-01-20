import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../CSS/ChatPage.css'
import { useEffect } from 'react';

const ChatPage = ({socket}) => {
  const [message, setMessage] = useState('');
  const [cmessages, setcMessages] = useState([{user:"def",text:"default"},{user:"def",text:"default"}]); // Store chat messages
  const [activeUsers, setActiveUsers] = useState(['User1', 'User2', 'User3']);
  let usName= localStorage.getItem('userName');

  useEffect(()=>{
    socket.on("recieve_msg",(data)=>{
      setcMessages([...cmessages, {user:data.usName,text:data.message}])
    
    })
  },[socket])
    const navigate = useNavigate();

    


  const handleSendMessage =async ()=>{
    setcMessages([...cmessages, { user: usName, text: message }]);
    await socket.emit("send_message",{usName:usName,message:message});
    
    setMessage('');
  }

  const handleLeave =()=>{
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="chat-body-container">
    <div className="active-users-panel">
      <h3>Active Users</h3>
      <ul>
        {activeUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
    <div className="chat-area">
      {/* Display chat messages */}
      {cmessages.map((msg, index) => (
        <div key={index} className={msg.user === usName ? 'message sent' : 'message received'}>
          <strong>{msg.user===usName ? 'You' : msg.user}:</strong> {msg.text}
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
    <button className="leave-chat-button" onClick={handleLeave}>Leave Chat</button>
  </div>
  )
}

export default ChatPage
