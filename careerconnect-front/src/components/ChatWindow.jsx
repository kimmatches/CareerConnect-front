import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IoIosClose } from "react-icons/io";
import { MdSettings } from "react-icons/md";
import './ChatWindow.css';
import ChatInput from './component/ChatInput';

const ChatWindow = ({ chat, onClose, messages, onSendMessage, onLeaveChat }) => {
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const chatWindowRef = useRef(null);
    const messagesEndRef = useRef(null);

    const handleSend = (message) => {
        if (message.trim() !== '') {
            onSendMessage(message);
        }
    };

    const handleMouseDown = (e) => {
        if (!isFullScreen && e.target.closest('.chat-window-header') && !e.target.closest('.fullscreen-toggle')) {
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

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const handleLeaveChat = () => {
        if (onLeaveChat) {
            onLeaveChat();
        }
        onClose();
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

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
            <div className="chat-window-header">
                <div className="header-row">
                    <button className="fullscreen-toggle" onClick={toggleFullScreen}>
                        {isFullScreen ? '🗗' : '🗖'}
                    </button>
                    <button onClick={onClose}>
                        <IoIosClose size={30} />
                    </button>
                </div>
                <div className="header-row2">
                    <div className="profile-name-wrapper">
                        <div className="profile-placeholder">
                            {getInitials(chat.name)}
                        </div>
                        <h3>{chat.name}</h3>
                    </div>
                    <div className="settings-wrapper">
                        <button className="settings-button" onClick={toggleSettings}>
                            <MdSettings size={25} />
                        </button>
                        {isSettingsOpen && (
                            <div className="settings-dropdown">
                                <button onClick={handleLeaveChat}>채팅방 나가기</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message-container ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                        {msg.sender !== 'me' && (
                            <div className="profile-row">
                                <div className="profile-placeholder">
                                    <span className="profile-initials">{getInitials(chat.name)}</span>
                                </div>
                                <div className="message-wrapper">
                                    <span className="chat-room-name">{chat.name}</span>
                                    <div className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        )}
                        {msg.sender === 'me' && (
                            <div className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                                {msg.text}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <ChatInput onSendMessage={handleSend} showAttachButton={isFullScreen} /> {/* isFullScreen 상태를 전달 */}
        </div>
    );
};

export default ChatWindow;
