import React, { useState } from 'react';
import './Chat.css';

const SidebarItem = ({ icon, text, onClick }) => (
    <div className="sidebar-item" onClick={onClick}>
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

const ChatWindow = ({ friend, onClose, messages, onSendMessage }) => {
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
                <h3>{friend.name}</h3>
                <button onClick={onClose}>닫기</button>
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

    const openChat = (friend) => {
        setSelectedChat(friend);
        if (!chatMessages[friend.id]) {
            setChatMessages({
                ...chatMessages,
                [friend.id]: []
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

            // 여기에 실제 메시지 전송 로직을 추가할 수 있습니다.
            // 예를 들어, 서버로 메시지를 보내는 API 호출 등

            // 간단한 "에코" 응답을 시뮬레이션합니다.
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
                    <span className="sidebar-menu-icon">≡</span>
                </div>
                <SidebarItem icon="👥" text="친구" />
                <SidebarItem icon="📚" text="커스텀 스터디" />
                <SidebarItem icon="🔖" text="관심 스터디" />
                <SidebarItem icon="💬" text="나의 채팅" />
            </div>

            <div className="main-chat-area">
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
                </div>

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

                <div className="profile-button-container">
                    <button className="profile-button">
                        프로필
                    </button>
                </div>
            </div>

            {selectedChat && (
                <ChatWindow
                    friend={selectedChat}
                    onClose={() => setSelectedChat(null)}
                    messages={chatMessages[selectedChat.id] || []}
                    onSendMessage={sendMessage}
                />
            )}
        </div>
    );
};

export default Chat;