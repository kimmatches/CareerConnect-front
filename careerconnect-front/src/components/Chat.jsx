import React, { useState } from 'react';
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

    const handleSend = () => {
        if (newMessage.trim() !== '') {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>{chat.name}</h3>
                <button onClick={onClose}>×</button>
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
    const [chatRooms, setChatRooms] = useState([
        { id: 1, name: "일반 채팅방", lastMessage: "환영합니다!" },
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

    const filteredChatRooms = chatRooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
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

    const createChatRoom = (roomName) => {
        const newRoom = {
            id: chatRooms.length + 1,
            name: roomName,
            lastMessage: "새로운 채팅방이 생성되었습니다.",
        };
        setChatRooms([...chatRooms, newRoom]);
    };

    return (
        <div className="chat-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>메뉴</h2>
                </div>
                <SidebarItem icon="👥" text="친구" onClick={() => setActiveSection('friends')} isActive={activeSection === 'friends'} />
                <SidebarItem icon="💬" text="채팅" onClick={() => setActiveSection('chats')} isActive={activeSection === 'chats'} />
                <SidebarItem icon="📚" text="커스텀 스터디" onClick={() => setActiveSection('customStudy')} isActive={activeSection === 'customStudy'} />
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

                    {activeSection === 'chats' && (
                        <div className="chat-list">
                            {filteredChatRooms.map(room => (
                                <ChatListItem
                                    key={room.id}
                                    name={room.name}
                                    message={room.lastMessage}
                                    onClick={() => openChat(room)}
                                />
                            ))}
                        </div>
                    )}

                    {activeSection === 'customStudy' && (
                        <div className="custom-study">
                            <h2>커스텀 스터디</h2>
                            <p>여기에 커스텀 스터디 기능을 구현할 수 있습니다.</p>
                        </div>
                    )}

                    {activeSection === 'interestedStudy' && (
                        <div className="interested-study">
                            <h2>관심 스터디</h2>
                            <p>여기에 관심 스터디 기능을 구현할 수 있습니다.</p>
                        </div>
                    )}
                </div>

                <div className="profile-button-container">
                    <button className="profile-button">
                        프로필
                    </button>
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
                    onCreateRoom={createChatRoom}
                />
            )}
        </div>
    );
};

export default Chat;