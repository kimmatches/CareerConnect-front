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

    return (
        <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
            <div className="sidebar-header">
                <IoMenu size={30} color="black" onClick={toggleSidebar} />
            </div>
            {chatRooms.map(room => (
                <SidebarItem key={room.id} icon="💬" text={room.name} to={room.to} />
            ))}
    
        </div>
    );
};

export default Sidebar;
