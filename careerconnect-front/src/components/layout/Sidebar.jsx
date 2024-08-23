import React from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import './Sidebar.css';

const SidebarItem = ({ icon, text, to }) => (
  <Link to={to} className="sidebar-item">
    <span className="sidebar-icon">{icon}</span>
    <span>{text}</span>
  </Link>
);

const Sidebar = ({ isVisible, toggleSidebar }) => (
  <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
    <div className="sidebar-header">
      <IoMenu size={30} color="black" onClick={toggleSidebar} />
    </div>
    <SidebarItem icon="💬" text="나의 채팅" to="/mychat" />
    <SidebarItem icon="💬" text="친구" to="/chat" />
    <SidebarItem icon="💬" text="스터디방" to="/groupchat" />
  </div>
);

export default Sidebar;
