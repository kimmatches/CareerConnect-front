import React from 'react';
import Sidebar from './layout/Sidebar';


const GroupChat = () => {
    return (
      <div className="groupchat-container">
        <Sidebar /> 
        <div className="main-groupchat-area">
          <h1>Group Chat Page</h1>
        </div>
      </div>
    );
  };
  
  export default GroupChat;