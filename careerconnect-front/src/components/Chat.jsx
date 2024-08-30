import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/api';
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
    const [username, setUsername] = useState('');
    const [friends, setFriends] = useState(() => {
        const savedFriends = localStorage.getItem('friends');
        return savedFriends ? JSON.parse(savedFriends) : [
            { id: 1, name: '나', message: '안녕하세요', isOnline: true },
            { id: 2, name: 'AI', message: '오늘도 열심히', isOnline: true },
            { id: 3, name: '친구', message: '안녕하세요', isOnline: true },
        ];
    });

    const [openChats, setOpenChats] = useState([]);
    const [chatMessages, setChatMessages] = useState({});
    const [activeSection, setActiveSection] = useState('friends');

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('friends', JSON.stringify(friends));
    }, [friends]);

    const handleSearch = (e) => setSearchQuery(e.target.value);

    const handleUsernameChange = (e) => setUsername(e.target.value);

    const addFriend = () => {
        if (username.trim() !== '') {
            const friendExists = friends.some(friend => friend.name === username);

            if (friendExists) {
                alert('이미 추가된 친구입니다.');
                return;
            }

            userApi.getUserList(username)
                .then(response => {
                    if (response.data.result.resultCode === 200) {
                        const user = response.data.body;
                        const newFriend = {
                            id: user.id,
                            name: user.username,
                            message: '새로운 친구입니다.',
                            isOnline: false,
                        };
                        setFriends([...friends, newFriend]);
                        setUsername('');
                        alert(`${user.username}님을 친구로 추가했습니다!`);
                    } else {
                        alert('친구 추가에 실패했습니다.');
                    }
                })
                .catch(error => {
                    console.error('Failed to add friend:', error);
                    alert('친구 추가에 실패했습니다.');
                });
        }
    };

    const fetchApiKey = async () => {
        try {
            const response = await userApi.getApiKey();
            const apiKey = response.data.key;
            console.log("API KEY 정상출력");
            return apiKey;
        } catch (error) {
            console.error('Error fetching API key:', error);
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
    
        const chat = friends.find((friend) => friend.id === chatId);
    
        if (chat.name === 'AI') {
            // GPT와의 채팅 처리
            fetchApiKey()
                .then((apiKey) => {
                    return userApi.sendMessageToGPT(apiKey, message);
                })
                .then((response) => {
                    const gptReply = {
                        sender: 'AI',
                        content: response.data.choices[0].message.content,
                        isMine: false,
                        file: null,
                    };
    
                    setChatMessages((prevMessages) => ({
                        ...prevMessages,
                        [chatId]: [...(prevMessages[chatId] || []), gptReply],
                    }));
                })
                .catch((error) => {
                    console.error('Error communicating with GPT:', error);
                });
        } else {
            // 친구 자동 응답 처리
            setTimeout(() => {
                const replyMessage = {
                    sender: chat.name,
                    content: '자동 답장입니다!',
                    isMine: false,
                    file: null,
                };
                setChatMessages((prevMessages) => ({
                    ...prevMessages,
                    [chatId]: [...(prevMessages[chatId] || []), replyMessage],
                }));
            }, 1000);
        }
    };

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

    const filteredFriends = friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                value={username}
                                onChange={handleUsernameChange}
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

