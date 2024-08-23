import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router import 추가
import './Chat.css';

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

    const navigate = useNavigate(); // useNavigate 훅 사용

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
        if (chat.name === "나") {
            navigate('/mypage'); // '나'를 클릭했을 때 새로운 페이지로 이동
        } else {
            setSelectedChat(chat);
            if (!chatMessages[chat.id]) {
                setChatMessages({
                    ...chatMessages,
                    [chat.id]: []
                });
            }
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
        </div>
    );
};

export default Chat;
