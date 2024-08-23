import React, { useState, useEffect, useRef } from 'react';
import './MyChat.css';

const MyChat = () => {
  const [messages, setMessages] = useState([
    { sender: '나', content: '안녕하세요', isMine: true },
    { sender: '친구', content: '안녕하세요! 잘 지내세요?', isMine: false },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const chatListRef = useRef(null); 

  const handleSendMessage = () => {
    if (newMessage.trim()) { 
      setMessages([...messages, { sender: '나', content: newMessage, isMine: true }]);
      setNewMessage(''); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(); 
    }
  };

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight; 
    }
  }, [messages]); 

  return (
    <div className="mychat-main-chat-area">
      <div className="mychat-chat-list" ref={chatListRef}>
        {messages.map((message, index) => (
          <div key={index} className={`mychat-chat-item ${message.isMine ? 'mychat-mine' : 'mychat-friend'}`}>
            {!message.isMine && (
              <div className="mychat-chat-avatar-name">
                <div className="mychat-chat-avatar">{message.sender[0]}</div>
                <div className="mychat-chat-name">{message.sender}</div>
              </div>
            )}
            <div className="mychat-chat-bubble">
              <p className="mychat-chat-message">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mychat-input-area">
        <input
          type="text"
          placeholder="메시지 입력"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} 
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>전송</button> 
      </div>
    </div>
  );
};

export default MyChat;
