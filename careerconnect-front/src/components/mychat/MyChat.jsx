import React, { useState, useEffect, useRef } from 'react';
import './MyChat.css';
import ChatInput from '../component/ChatInput';

const MyChat = () => {
  const [messages, setMessages] = useState([]); 
  const chatListRef = useRef(null);

  const handleSendMessage = (message) => {
    if (message.trim()) {
      setMessages([...messages, { sender: '나', content: message, isMine: true }]);
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
          <div key={index} className="mychat-chat-item mychat-mine">
            <div className="mychat-chat-bubble">
              <p className="mychat-chat-message">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} showAttachButton={true} />
    </div>
  );
};

export default MyChat;