import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import socketIO, { io } from 'socket.io-client';
import Home from './Components/Home';
import ChatPage from './Components/ChatPage';
const socket = io.connect('http://localhost:4000');



const App = () => {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
      </Routes>
    </Router>
    
    </>
  );
};

export default App;
