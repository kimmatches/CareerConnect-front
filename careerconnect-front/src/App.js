import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
// import ChatRoom from './components/ChatRoom';
import './App.css';

const App = () => {
  return (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
            {/* <Route path="/chat/:roomId" element={<ChatRoom />} /> */}
          </Routes>
  );
};

export default App;
