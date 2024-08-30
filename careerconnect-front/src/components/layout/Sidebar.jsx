import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu, IoLogOutOutline, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import './Sidebar.css';

const SidebarItem = ({ icon, text, to, subItems, isOpen, toggleSubMenu }) => (
    <div className="sidebar-item-container">
        <Link to={to} className="sidebar-item" onClick={subItems ? toggleSubMenu : undefined}>
            <span className="sidebar-icon">{icon}</span>
            <span>{text}</span>
            {subItems && (isOpen ? <IoChevronUp /> : <IoChevronDown />)}
        </Link>
        {subItems && isOpen && (
            <div className="sidebar-submenu">
                {subItems.map((item, index) => (
                    <Link key={index} to={item.to} className="sidebar-subitem">
                        {item.name}
                    </Link>
                ))}
            </div>
        )}
    </div>
);

const Sidebar = ({ isVisible, toggleSidebar }) => {
    const [chatRooms, setChatRooms] = useState([
        { id: 1, name: "나의 채팅", to: "/mychat", icon: "💬" },
        { id: 2, name: "친구", to: "/chat", icon: "👥" },
        { id: 3, name: "스터디방", to: "/groupchat", icon: "📚" },
        { id: 4, name: "그룹톡방", to: "/chatroom", icon: "📚" },
        {
            id: 5,
            name: "커리어Hub",
            to: "/community",
            icon: "💼",
            subItems: [
                { name: "개발자", to: "/community/developer" },
                { name: "디자이너", to: "/community/designer" },
                { name: "마케터", to: "/community/marketer" },
                { name: "기획자", to: "/community/planner" },
                { name: "데이터 분석가", to: "/community/dataAnalyst" },
                { name: "IT 관리자", to: "/community/itManager" },
                { name: "콘텐츠 작가", to: "/community/contentWriter" },
                { name: "HR 관리자", to: "/community/hrManager" },
            ]
        },
    ]);

    const [openSubMenu, setOpenSubMenu] = useState(null);

    const toggleSubMenu = (id) => {
        setOpenSubMenu(openSubMenu === id ? null : id);
    };

    return (
        <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
            <div className="sidebar-content">
                <div className="sidebar-header">
                    <IoMenu size={30} color="black" onClick={toggleSidebar} />
                </div>
                {chatRooms.map(room => (
                    <SidebarItem
                        key={room.id}
                        icon={room.icon}
                        text={room.name}
                        to={room.to}
                        subItems={room.subItems}
                        isOpen={openSubMenu === room.id}
                        toggleSubMenu={() => toggleSubMenu(room.id)}
                    />
                ))}
            </div>
            <div className="sidebar-footer">
                <SidebarItem
                    icon={<IoLogOutOutline size={20} />}
                    text="로그아웃"
                    to="/"
                />
            </div>
        </div>
    );
};

export default Sidebar;