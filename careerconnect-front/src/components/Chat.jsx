import React, { useState } from 'react';
import './Chat.css';

const ChatListItem = ({ name, message, isOnline }) => (
  <div className="chat-item">
    <div className="chat-avatar">
      {name[0]}
    </div>
    <div className="chat-content">
      <div className="chat-name">
        {name}
        {isOnline && <span className="online-status"></span>}
      </div>
      <p className="chat-message">{message}</p>
    </div>
  </div>
);

const Chat = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="main-chat-area">
      <div className="search-bar">
        <div className="search-input">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="search-input">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="친구찾기" />
        </div>
      </div>

      <div className="chat-list">
        <ChatListItem name="나" message="안녕하세요" isOnline={true} />
        <ChatListItem name="AI" message="오늘도 열심히" isOnline={false} />
        <ChatListItem name="친구" message="안녕하세요" isOnline={true} />
      </div>
    </div>
  );
};

export default Chat;
