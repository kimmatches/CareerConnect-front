import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ChatWindow.css';
const ChatWindow = ({ chat, onClose, messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const [position, setPosition] = useState({ x: 100, y: 100 });
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

export default ChatWindow;