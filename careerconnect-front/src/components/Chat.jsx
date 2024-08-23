import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Chat.css';

const SidebarItem = ({ icon, text, onClick, isActive }) => (
    <div className={`sidebar-item ${isActive ? 'active' : ''}`} onClick={onClick}>
        <span className="sidebar-icon">{icon}</span>
        <span>{text}</span>
    </div>
);

const ChatListItem = ({ name, message, isOnline, onClick }) => (
    <div className="chat-item" onClick={onClick}>
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
const ChatWindow = ({ chat, onClose, messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const chatWindowRef = useRef(null);

    const handleSend = () => {
        if (newMessage.trim() !== '') {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    const handleMouseDown = (e) => {
        if (!isFullScreen && e.target.closest('.chat-header') && !e.target.closest('.fullscreen-toggle')) {
            setIsDragging(true);
            const rect = chatWindowRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseMove = useCallback((e) => {
        if (isDragging && !isFullScreen) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            setPosition({ x: newX, y: newY });
        }
    }, [isDragging, dragOffset, isFullScreen]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
        if (isFullScreen) {
            const maxX = window.innerWidth - 300;
            const maxY = window.innerHeight - 400;
            setPosition({
                x: Math.min(Math.max(position.x, 0), maxX),
                y: Math.min(Math.max(position.y, 0), maxY)
            });
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    const chatWindowStyle = isFullScreen
        ? {
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000
        }
        : {
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: '300px',
            height: '400px',
            cursor: isDragging ? 'grabbing' : 'auto'
        };

    return (
        <div
            className={`chat-window ${isFullScreen ? 'fullscreen' : ''}`}
            style={chatWindowStyle}
            ref={chatWindowRef}
            onMouseDown={handleMouseDown}
        >
            <div className="chat-header" style={{ cursor: isFullScreen ? 'default' : 'grab' }}>
                <h3>{chat.name}</h3>
                <div>
                    <button className="fullscreen-toggle" onClick={toggleFullScreen}>
                        {isFullScreen ? '🗗' : '🗖'}
                    </button>
                    <button onClick={onClose}>×</button>
                </div>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="메시지를 입력하세요..."
                />
                <button onClick={handleSend}>전송</button>
            </div>
        </div>
    );
};

const CreateChatRoomModal = ({ onClose, onCreateRoom }) => {
    const [roomName, setRoomName] = useState('');

    const handleCreate = () => {
        if (roomName.trim() !== '') {
            onCreateRoom(roomName);
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>새 채팅방 만들기</h2>
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="채팅방 이름"
                />
                <div className="modal-buttons">
                    <button onClick={handleCreate}>만들기</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

const Chat = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [friendQuery, setFriendQuery] = useState('');
    const [friends, setFriends] = useState([
        { id: 1, name: "나", message: "안녕하세요", isOnline: true },
        { id: 2, name: "AI", message: "오늘도 열심히", isOnline: false },
        { id: 3, name: "친구", message: "안녕하세요", isOnline: true },
    ]);

    const [selectedChat, setSelectedChat] = useState(null);
    const [chatMessages, setChatMessages] = useState({});
    const [activeSection, setActiveSection] = useState('friends');
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFriendSearch = (e) => {
        setFriendQuery(e.target.value);
    };

    const addFriend = () => {
        if (friendQuery.trim() !== '') {
            const newFriend = {
                id: friends.length + 1,
                name: friendQuery,
                message: "새로운 친구입니다.",
                isOnline: false
            };
            setFriends([...friends, newFriend]);
            setFriendQuery('');
            alert(`${friendQuery}님을 친구로 추가했습니다!`);
        }
    };

    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );



    const openChat = (chat) => {
        setSelectedChat(chat);
        if (!chatMessages[chat.id]) {
            setChatMessages({
                ...chatMessages,
                [chat.id]: []
            });
        }
    };

    const sendMessage = (message) => {
        if (selectedChat) {
            const updatedMessages = [
                ...(chatMessages[selectedChat.id] || []),
                { sender: 'me', text: message }
            ];
            setChatMessages({
                ...chatMessages,
                [selectedChat.id]: updatedMessages
            });

            setTimeout(() => {
                const echoResponse = [
                    ...updatedMessages,
                    { sender: selectedChat.name, text: `에코: ${message}` }
                ];
                setChatMessages({
                    ...chatMessages,
                    [selectedChat.id]: echoResponse
                });
            }, 1000);
        }
    };


    return (
        <div className="chat-container">
            <div className="sidebar">
                <div className="sidebar-header">
                </div>
                <SidebarItem icon="🔖" text="관심 스터디" onClick={() => setActiveSection('interestedStudy')} isActive={activeSection === 'interestedStudy'} />
            </div>

            <div className="main-content">
                <div className="search-bar">
                    <div className="search-input">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="검색"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    {activeSection === 'friends' && (
                        <div className="search-input">
                            <span className="search-icon">👤</span>
                            <input
                                type="text"
                                placeholder="친구 찾기"
                                value={friendQuery}
                                onChange={handleFriendSearch}
                            />
                            <button onClick={addFriend} className="add-friend-btn">추가</button>
                        </div>
                    )}
                    {activeSection === 'chats' && (
                        <button onClick={() => setShowCreateRoomModal(true)} className="create-room-btn">
                            새 채팅방
                        </button>
                    )}
                </div>

                <div className="content-area">
                    {activeSection === 'friends' && (
                        <div className="chat-list">
                            {filteredFriends.map(friend => (
                                <ChatListItem
                                    key={friend.id}
                                    name={friend.name}
                                    message={friend.message}
                                    isOnline={friend.isOnline}
                                    onClick={() => openChat(friend)}
                                />
                            ))}
                        </div>
                    )}


                    {activeSection === 'customStudy' && (
                        <div className="custom-study">
                        </div>
                    )}

                    {activeSection === 'interestedStudy' && (
                        <div className="interested-study">
                        </div>
                    )}
                </div>
            </div>

            {selectedChat && (
                <ChatWindow
                    chat={selectedChat}
                    onClose={() => setSelectedChat(null)}
                    messages={chatMessages[selectedChat.id] || []}
                    onSendMessage={sendMessage}
                />
            )}

            {showCreateRoomModal && (
                <CreateChatRoomModal
                    onClose={() => setShowCreateRoomModal(false)}
                />
            )}
        </div>
    );
};

export default Chat;