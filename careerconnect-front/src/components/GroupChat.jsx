import React, { useState, useEffect } from 'react';
import './GroupChat.css';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FiPaperclip, FiImage, FiSend, FiArrowLeft } from 'react-icons/fi';
import JobPostings from './JobPostings';
import './JobPostings.css';

const GroupChatSidebar = ({ groups, myGroups, onSelectGroup, onCreateGroup, onlineUsers }) => {
    const [newGroupName, setNewGroupName] = useState('');

    const handleCreateGroup = (e) => {
        e.preventDefault();
        if (newGroupName.trim()) {
            onCreateGroup(newGroupName);
            setNewGroupName('');
        }
    };

    const renderGroupList = (groupList, title) => (
        <>
            <h3>{title}</h3>
            {groupList.map((group) => (
                <div key={group.id} className="group-item" onClick={() => onSelectGroup(group)}>
                    <div className="group-avatar">{group.name[0]}</div>
                    <div className="group-info">
                        <div className="group-name">
                            {group.name}
                            {onlineUsers.includes(group.name) && <span className="online-indicator" />}
                        </div>
                        <div className="last-message">{group.messages[group.messages.length - 1]?.text}</div>
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <div className="group-chat-sidebar">
            <div className="sidebar-header">
                <h2>그룹 채팅</h2>
            </div>
            <form onSubmit={handleCreateGroup} className="create-group-form">
                <input
                    type="text"
                    placeholder="새 그룹 만들기"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                />
                <button type="submit">+</button>
            </form>
            <div className="group-list">
                {renderGroupList(myGroups, "나의 그룹채팅방")}
                {renderGroupList(groups, "다른 그룹채팅방")}
            </div>
        </div>
    );
};

const ChatMessage = ({ message, isOwnMessage }) => {
    return (
        <div className={`chat-message ${isOwnMessage ? 'own-message' : ''}`}>
            {!isOwnMessage && <div className="message-avatar">{message.sender[0]}</div>}
            <div className="message-content">
                <div className="message-sender">{message.sender}</div>
                <div className="message-text">
                    {message.text}
                    {message.file && (
                        <div className="message-file">
                            {message.file.type.startsWith('image') ? (
                                <img src={URL.createObjectURL(message.file)} alt="Shared file" />
                            ) : (
                                <a href={URL.createObjectURL(message.file)} download>{message.file.name}</a>
                            )}
                        </div>
                    )}
                </div>
                {message.read && <div className="message-read">✓</div>}
            </div>
        </div>
    );
};

const ChatRoom = ({ group, onSendMessage, onInvite, onLeave, onBack }) => {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const typingTimer = setTimeout(() => {
            setIsTyping(false);
        }, 3000);

        return () => clearTimeout(typingTimer);
    }, [message]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() || file) {
            onSendMessage(message, file);
            setMessage('');
            setFile(null);
        }
    };

    const handleEmojiSelect = (emoji) => {
        setMessage(prevMessage => prevMessage + emoji.native);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="chat-room">
            <div className="chat-header">
                <button onClick={onBack} className="back-button"><FiArrowLeft /></button>
                <h2>{group.name}</h2>
                <div className="chat-actions">
                    <button onClick={onInvite}>초대하기</button>
                    <button onClick={onLeave}>나가기</button>
                </div>
            </div>
            <div className="chat-messages">
                {group.messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} isOwnMessage={msg.sender === '나'} />
                ))}
            </div>
            {isTyping && <div className="typing-indicator">Someone is typing...</div>}
            <form onSubmit={handleSendMessage} className="chat-input">
                <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                {showEmojiPicker && (
                    <div className="emoji-picker-container">
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                    </div>
                )}
                <label htmlFor="file-upload" className="file-upload-label">
                    <FiPaperclip />
                </label>
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="image-upload" className="file-upload-label">
                    <FiImage />
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <input
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        setIsTyping(true);
                    }}
                />
                <button type="submit"><FiSend /></button>
            </form>
        </div>
    );
};

const GroupChat = () => {
    const [groups, setGroups] = useState([
        {
            id: 1,
            name: "개발자 모임",
            messages: [
                { sender: "친구1", text: "프로젝트 업데이트가 필요해요." },
                { sender: "나", text: "네, 내일 회의에서 논의해보죠." },
            ],
            members: ["나", "친구1", "친구2"],
        },
        {
            id: 2,
            name: "주말 면접 모임",
            messages: [
                { sender: "친구3", text: "이번 주 토요일 면접스터디 어떠세요?" },
                { sender: "나", text: "좋아요! 어디로 가나요?" },
            ],
            members: ["나", "친구3", "친구4", "친구5"],
        },
    ]);
    const [myGroups, setMyGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(['나', '친구1', '친구3']);

    useEffect(() => {
        const onlineTimer = setInterval(() => {
            setOnlineUsers(prev => {
                const newOnlineUsers = [...prev];
                if (Math.random() > 0.5) {
                    newOnlineUsers.push(`친구${Math.floor(Math.random() * 5) + 1}`);
                } else {
                    newOnlineUsers.pop();
                }
                return [...new Set(newOnlineUsers)];
            });
        }, 10000);

        return () => clearInterval(onlineTimer);
    }, []);

    const handleSelectGroup = (group) => {
        setSelectedGroup(group);
    };

    const handleCreateGroup = (name) => {
        const newGroup = {
            id: groups.length + myGroups.length + 1,
            name,
            messages: [],
            members: ["나"],
        };
        setMyGroups([...myGroups, newGroup]);
    };

    const updateGroup = (updatedGroup) => {
        if (myGroups.some(g => g.id === updatedGroup.id)) {
            setMyGroups(myGroups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)));
        } else {
            setGroups(groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)));
        }
        setSelectedGroup(updatedGroup);
    };

    const handleSendMessage = (text, file) => {
        const updatedGroup = {
            ...selectedGroup,
            messages: [...selectedGroup.messages, {
                sender: "나",
                text,
                file,
                read: false,
                timestamp: new Date().toISOString()
            }],
        };
        updateGroup(updatedGroup);

        setTimeout(() => {
            const readMessage = {
                ...updatedGroup.messages[updatedGroup.messages.length - 1],
                read: true
            };
            const readUpdatedGroup = {
                ...updatedGroup,
                messages: [...updatedGroup.messages.slice(0, -1), readMessage]
            };
            updateGroup(readUpdatedGroup);
        }, 2000);
    };

    const handleInvite = () => {
        const name = prompt("초대할 사람의 이름을 입력하세요:");
        if (name) {
            const updatedGroup = {
                ...selectedGroup,
                members: [...selectedGroup.members, name],
                messages: [...selectedGroup.messages, { sender: "시스템", text: `${name}님이 그룹에 참여했습니다.` }],
            };
            updateGroup(updatedGroup);
        }
    };

    const handleLeave = () => {
        const confirmed = window.confirm("정말로 이 그룹을 나가시겠습니까?");
        if (confirmed) {
            if (myGroups.some(g => g.id === selectedGroup.id)) {
                setMyGroups(myGroups.filter((g) => g.id !== selectedGroup.id));
            } else {
                setGroups(groups.filter((g) => g.id !== selectedGroup.id));
            }
            setSelectedGroup(null);
        }
    };

    const handleBack = () => {
        setSelectedGroup(null);
    };

    return (
        <div className="group-chat-container">
            {selectedGroup ? (
                <ChatRoom
                    group={selectedGroup}
                    onSendMessage={handleSendMessage}
                    onInvite={handleInvite}
                    onLeave={handleLeave}
                    onBack={handleBack}
                />
            ) : (
                <>
                    <GroupChatSidebar
                        groups={groups}
                        myGroups={myGroups}
                        onSelectGroup={handleSelectGroup}
                        onCreateGroup={handleCreateGroup}
                        onlineUsers={onlineUsers}
                    />
                    <div className="main-content">
                        <JobPostings />
                        <div className="welcome-screen">
                            <h2>그룹 채팅에 오신 것을 환영합니다!</h2>
                            <p>왼쪽 사이드바에서 그룹을 선택하거나 새 그룹을 만들어 대화를 시작하세요.</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );  
};

export default GroupChat;