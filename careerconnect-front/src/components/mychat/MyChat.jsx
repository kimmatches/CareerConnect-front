import React, { useState, useEffect, useRef } from 'react';
import './MyChat.css';
import ChatInput from '../component/ChatInput';

const MyChat = () => {
  const [messages, setMessages] = useState([]);
  const chatListRef = useRef(null);

  const handleSendMessage = (message, file) => {
    if (message.trim() || file) {
      const newMessage = {
        sender: '나',
        content: message,
        isMine: true,
        file: file || null, 
      };
      setMessages([...messages, newMessage]);
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
          <div key={index} className={`mychat-chat-item ${message.isMine ? 'mychat-mine' : 'mychat-other'}`}>
            <div className="mychat-chat-bubble">
              {message.content && <p className="mychat-chat-message">{message.content}</p>}
              {message.file && (
                message.file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(message.file)}
                    alt={message.file.name}
                    className="mychat-chat-image"
                  />
                ) : (
                  <p className="mychat-chat-file">{message.file.name}</p>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} showAttachButton={true} />
    </div>
  );
};

export default MyChat;
