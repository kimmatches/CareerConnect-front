import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import './Sidebar.css';

const SidebarItem = ({ icon, text, to }) => (
    <Link to={to} className="sidebar-item">
        <span className="sidebar-icon">{icon}</span>
        <span>{text}</span>
    </Link>
);

const Sidebar = ({ isVisible, toggleSidebar }) => {
    const [chatRooms, setChatRooms] = useState([
        { id: 1, name: "나의 채팅", to: "/mychat" },
        { id: 2, name: "친구", to: "/chat" },
        { id: 3, name: "스터디방", to: "/groupchat" },
    ]);
    const [newRoomName, setNewRoomName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateRoom = () => {
        if (newRoomName.trim() !== '') {
            const newRoom = {
                id: chatRooms.length + 1,
                name: newRoomName,
                to: `/chatroom/${chatRooms.length + 1}`
            };
            setChatRooms([...chatRooms, newRoom]);
            setNewRoomName('');
            setIsCreating(false);
        }
    };

    return (
        <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
            <div className="sidebar-header">
                <IoMenu size={30} color="black" onClick={toggleSidebar} />
            </div>
            {chatRooms.map(room => (
                <SidebarItem key={room.id} icon="💬" text={room.name} to={room.to} />
            ))}
            <div className="create-room-container">
                {isCreating ? (
                    <div className="create-room-form">
                        <input
                            type="text"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            placeholder="채팅방 이름"
                            className="create-room-input"
                        />
                        <button onClick={handleCreateRoom} className="create-room-btn">
                            생성
                        </button>
                        <button onClick={() => setIsCreating(false)} className="create-room-cancel-btn">
                            취소
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsCreating(true)} className="create-room-toggle-btn">
                        새로운 채팅방 생성
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
