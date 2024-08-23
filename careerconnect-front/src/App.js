import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import ChatRoom from './components/ChatRoom';
import './App.css';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;
