import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import ChatWindow from './ChatWindow';

const ChatListItem = ({ name, message, isOnline, onClick }) => (
    <div className="chat-item" onClick={onClick}>
        <div className="chat-avatar">{name[0]}</div>
        <div className="chat-content">
            <div className="chat-name">
                {name}
                {isOnline && <span className="online-status"></span>}
            </div>
            <p className="chat-message">{message}</p>
        </div>
    </div>
);

const Chat = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [friendQuery, setFriendQuery] = useState('');
    const [friends, setFriends] = useState([
        { id: 1, name: '나', message: '안녕하세요', isOnline: true },
        { id: 2, name: 'AI', message: '오늘도 열심히', isOnline: false },
        { id: 3, name: '친구', message: '안녕하세요', isOnline: true },
    ]);

    const [openChats, setOpenChats] = useState([]); 
    const [chatMessages, setChatMessages] = useState({});
    const [activeSection, setActiveSection] = useState('friends');

    const navigate = useNavigate();

    const handleSearch = (e) => setSearchQuery(e.target.value);

    const handleFriendSearch = (e) => setFriendQuery(e.target.value);

    const addFriend = () => {
        if (friendQuery.trim() !== '') {
            const newFriend = {
                id: friends.length + 1,
                name: friendQuery,
                message: '새로운 친구입니다.',
                isOnline: false,
            };
            setFriends([...friends, newFriend]);
            setFriendQuery('');
            alert(`${friendQuery}님을 친구로 추가했습니다!`);
        }
    };

    const filteredFriends = friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openChat = (chat) => {
        if (chat.name === '나') {
            navigate('/mypage');
        } else {
            if (!openChats.some((openChat) => openChat.id === chat.id)) {
                setOpenChats([...openChats, chat]); 
            }
            
            if (!chatMessages[chat.id]) {
                setChatMessages({
                    ...chatMessages,
                    [chat.id]: [],
                });
            }
        }
    };

    const sendMessage = (chatId, message, file) => {
        const newMessage = {
            sender: '나',
            content: message,
            isMine: true,
            file: file || null,
        };

        const updatedMessages = [...(chatMessages[chatId] || []), newMessage];
        setChatMessages({
            ...chatMessages,
            [chatId]: updatedMessages,
        });

        // 자동 응답 메시지 추가
        setTimeout(() => {
            const replyMessage = {
                sender: friends.find((friend) => friend.id === chatId)?.name,
                content: '자동 답장입니다!',
                isMine: false,
                file: null,
            };
            setChatMessages((prevMessages) => ({
                ...prevMessages,
                [chatId]: [...(prevMessages[chatId] || []), replyMessage],
            }));
        }, 1000);
    };

    const closeChat = (chatId) => {
        setOpenChats(openChats.filter((chat) => chat.id !== chatId));
    };

    const leaveChat = (chatId) => {
        setChatMessages({
            ...chatMessages,
            [chatId]: [],
        });
        closeChat(chatId);
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
                            <button onClick={addFriend} className="add-friend-btn">
                                추가
                            </button>
                        </div>
                    )}
                </div>

                <div className="content-area">
                    {activeSection === 'friends' && (
                        <div className="chat-list">
                            {filteredFriends.map((friend) => (
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

            {openChats.map((chat) => (
                <ChatWindow
                    key={chat.id}
                    chat={chat}
                    messages={chatMessages[chat.id] || []} 
                    onClose={() => closeChat(chat.id)}
                    onSendMessage={(message, file) => sendMessage(chat.id, message, file)} 
                    onLeaveChat={() => leaveChat(chat.id)} 
                />
            ))}
        </div>
    );
};

export default Chat;
