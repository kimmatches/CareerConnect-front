import React, { useState } from 'react';
import './Chat.css';

const GroupChatListItem = ({ groupName, messages, members }) => (
    <div className="chat-item">
      <div className="chat-avatar-group">
        {members.slice(0, 3).map((member, index) => (
            <div
                key={index}
                className="chat-avatar"
                style={{ backgroundColor: member.color }}
            >
              {member.name[0]}
            </div>
        ))}
      </div>
      <div className="chat-content">
        <div className="chat-name">
          {groupName}
        </div>
        <p className="chat-message">{messages[messages.length - 1]}</p>
      </div>
    </div>
);

const GroupChat = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [groupChats, setGroupChats] = useState([
    {
      groupName: "개발자 모임",
      messages: ["프로젝트 업데이트가 필요해요."],
      members: [
        { name: "나", color: "#3498db" },
        { name: "AI", color: "#e74c3c" },
        { name: "친구1", color: "#2ecc71" }
      ]
    },
    {
      groupName: "스터디 그룹",
      messages: ["내일 회의 준비 완료했습니다."],
      members: [
        { name: "학생1", color: "#9b59b6" },
        { name: "학생2", color: "#f1c40f" },
        { name: "학생3", color: "#e67e22" }
      ]
    },
    {
      groupName: "동아리 모임",
      messages: ["다음 주 행사 준비 중입니다."],
      members: [
        { name: "회원1", color: "#1abc9c" },
        { name: "회원2", color: "#e74c3c" },
        { name: "회원3", color: "#3498db" }
      ]
    }
  ]);

  const createNewRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim() !== '') {
      const newRoom = {
        groupName: newRoomName,
        messages: ["새로운 방이 생성되었습니다."],
        members: [
          { name: "나", color: "#3498db" },
          { name: "AI", color: "#e74c3c" }
        ]
      };
      setGroupChats([...groupChats, newRoom]);
      setNewRoomName('');
    }
  };

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
          <form onSubmit={createNewRoom} className="search-input">
            <span className="search-icon">➕</span>
            <input
                type="text"
                placeholder="방 만들기"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
            />
          </form>
          <div className="search-input">
            <span className="search-icon">🔧</span>
            <input type="text" placeholder="나의 방 관리" />
          </div>
        </div>

        <div className="chat-list">
          {groupChats
              .filter((group) =>
                  group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((group, index) => (
                  <GroupChatListItem
                      key={index}
                      groupName={group.groupName}
                      messages={group.messages}
                      members={group.members}
                  />
              ))}
        </div>
      </div>
  );
};

export default GroupChat;