// import React, { useState, useRef, useEffect, useCallback } from 'react'; 
// import { IoIosClose } from "react-icons/io";
// import { MdSettings } from "react-icons/md";
// import './ChatWindow.css';
// import ChatInput from './component/ChatInput';

// const ChatWindow = ({ chat, messages, onClose, onLeaveChat, onSendMessage }) => {
//     const [isFullScreen, setIsFullScreen] = useState(false);  
//     const [isSettingsOpen, setIsSettingsOpen] = useState(false);  
//     const [isDragging, setIsDragging] = useState(false);  
//     const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });  
//     const chatWindowRef = useRef(null);
//     const messagesEndRef = useRef(null);

//     const handleMouseDown = (e) => {
//         if (!isFullScreen && e.target.closest('.chat-window-header') && !e.target.closest('.fullscreen-toggle')) {
//             setIsDragging(true); 
//             const rect = chatWindowRef.current.getBoundingClientRect();
//             setDragOffset({
//                 x: e.clientX - rect.left,
//                 y: e.clientY - rect.top,
//             });
//         }
//     };

//     const handleMouseMove = useCallback((e) => {
//         if (isDragging && !isFullScreen) {
//             const newX = e.clientX - dragOffset.x;
//             const newY = e.clientY - dragOffset.y;
//             chatWindowRef.current.style.left = `${newX}px`;
//             chatWindowRef.current.style.top = `${newY}px`;
//         }
//     }, [isDragging, dragOffset, isFullScreen]);

//     const handleMouseUp = useCallback(() => {
//         setIsDragging(false);  
//     }, []);

//     const handleSendMessage = (message, file) => {
//         onSendMessage(message, file);  
//     };

//     const toggleFullScreen = () => {
//         setIsFullScreen(!isFullScreen);
//     };

//     const toggleSettings = () => {
//         setIsSettingsOpen(!isSettingsOpen);
//     };

//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [messages]);

//     useEffect(() => {
//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', handleMouseUp);
//         return () => {
//             document.removeEventListener('mousemove', handleMouseMove);
//             document.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, [handleMouseMove, handleMouseUp]);

//     const chatWindowStyle = isFullScreen
//         ? {
//             position: 'fixed',
//             left: 0,
//             top: 0,
//             width: '100%',
//             height: '100%',
//             zIndex: 1000,
//         }
//         : {
//             position: 'fixed',
//             left: '100px',
//             top: '100px',
//             width: '300px',
//             height: '400px',
//             cursor: isDragging ? 'grabbing' : 'auto',
//         };

//     return (
//         <div
//             className={`chat-window ${isFullScreen ? 'fullscreen' : ''}`}
//             style={chatWindowStyle}
//             ref={chatWindowRef}
//             onMouseDown={handleMouseDown}
//         >
//             <div className="chat-window-header">
//                 <div className="header-row">
//                     <button className="fullscreen-toggle" onClick={toggleFullScreen}>
//                         {isFullScreen ? '🗗' : '🗖'}
//                     </button>
//                     <button onClick={onClose}>
//                         <IoIosClose size={30} />
//                     </button>
//                 </div>
//                 <div className="header-row2">
//                     <div className="profile-name-wrapper">
//                         <div className="profile-placeholder">
//                             {chat.name[0].toUpperCase()}
//                         </div>
//                         <h3>{chat.name}</h3>
//                     </div>
//                     <div className="settings-wrapper">
//                         <button className="settings-button" onClick={toggleSettings}>
//                             <MdSettings size={25} />
//                         </button>
//                         {isSettingsOpen && (
//                             <div className="settings-dropdown">
//                                 <button onClick={onLeaveChat}>채팅방 나가기</button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <div className="chat-messages">
//                 {messages.map((msg, index) => (
//                     <div key={index} className={`message-container ${msg.isMine ? 'sent' : 'received'}`}>
//                         {!msg.isMine && (
//                             <div className="profile-row">
//                                 <div className="profile-placeholder">
//                                     {msg.sender[0].toUpperCase()}
//                                 </div>
//                                 <div className="message-wrapper">
//                                     <span className="chat-room-name">{msg.sender}</span>
//                                     <div className="message received">
//                                         {msg.file ? (
//                                             msg.file.type.startsWith('image/') ? (
//                                                 <img
//                                                     src={URL.createObjectURL(msg.file)}
//                                                     alt={msg.file.name}
//                                                     style={{ maxWidth: '100%', borderRadius: '10px' }}
//                                                 />
//                                             ) : (
//                                                 <a href={URL.createObjectURL(msg.file)} download={msg.file.name}>
//                                                     {msg.file.name}
//                                                 </a>
//                                             )
//                                         ) : (
//                                             msg.content
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                         {msg.isMine && (
//                             <div className="message sent">
//                                 {msg.file ? (
//                                     msg.file.type.startsWith('image/') ? (
//                                         <img
//                                             src={URL.createObjectURL(msg.file)}
//                                             alt={msg.file.name}
//                                             style={{ maxWidth: '100%', borderRadius: '10px' }}
//                                         />
//                                     ) : (
//                                         <a href={URL.createObjectURL(msg.file)} download={msg.file.name}>
//                                             {msg.file.name}
//                                         </a>
//                                     )
//                                 ) : (
//                                     msg.content
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
//             <ChatInput onSendMessage={handleSendMessage} showAttachButton={isFullScreen} />
//         </div>
//     );
// };

// export default ChatWindow;


import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IoIosClose } from "react-icons/io";
import { MdSettings } from "react-icons/md";
import './ChatWindow.css';
import ChatInput from './component/ChatInput';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useUser } from '../UserProvider';

const ChatWindow = ({ chat, messages, onClose, onLeaveChat, onSendMessage }) => {
    const { currentUser } = useUser();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [chatMessages, setChatMessages] = useState(messages || []);
    const chatWindowRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws-chat');
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/topic/group', onMessageReceived);
            },
            onStompError: (error) => console.error('WebSocket Error', error),
        });
        client.activate();
        setStompClient(client);

        return () => {
            if (client) client.deactivate();
        };
    }, []);

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        setChatMessages((prevMessages) => [...prevMessages, message]);
    };

    const sendMessage = (messageContent, file) => {
        if (stompClient && stompClient.connected) {
            const chatMessage = {
                sender: currentUser.id,
                content: messageContent,
                file: file || null,
            };

            stompClient.publish({
                destination: `/app/sendMessage`,
                body: JSON.stringify(chatMessage),
            });

            // 메시지가 서버에 전송되지만 화면에 따로 추가하지 않음
            // 서버로부터 메시지가 수신될 때 화면에 추가됨
        }
    };

    const handleMouseDown = (e) => {
        if (!isFullScreen && e.target.closest('.chat-window-header') && !e.target.closest('.fullscreen-toggle')) {
            setIsDragging(true);
            const rect = chatWindowRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const handleMouseMove = useCallback((e) => {
        if (isDragging && !isFullScreen) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            chatWindowRef.current.style.left = `${newX}px`;
            chatWindowRef.current.style.top = `${newY}px`;
        }
    }, [isDragging, dragOffset, isFullScreen]);

    const handleMouseUp = useCallback(() => setIsDragging(false), []);

    const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

    const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

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
            zIndex: 1000,
        }
        : {
            position: 'fixed',
            left: '100px',
            top: '100px',
            width: '300px',
            height: '400px',
            cursor: isDragging ? 'grabbing' : 'auto',
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
                            {chat.name[0].toUpperCase()}
                        </div>
                        <h3>{chat.name}</h3>
                    </div>
                    <div className="settings-wrapper">
                        <button className="settings-button" onClick={toggleSettings}>
                            <MdSettings size={25} />
                        </button>
                        {isSettingsOpen && (
                            <div className="settings-dropdown">
                                <button onClick={onLeaveChat}>채팅방 나가기</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                    <div key={index} className={`message-container ${msg.sender === currentUser.id ? 'sent' : 'received'}`}>
                        {msg.sender !== currentUser.id && (
                            <div className="profile-row">
                                <div className="profile-placeholder">
                                    {msg.sender[0].toUpperCase()}
                                </div>
                                <div className="message-wrapper">
                                    <span className="chat-room-name">{msg.sender}</span>
                                    <div className="message received">
                                        {msg.file ? (
                                            msg.file.type.startsWith('image/') ? (
                                                <img
                                                    src={URL.createObjectURL(msg.file)}
                                                    alt={msg.file.name}
                                                    style={{ maxWidth: '100%', borderRadius: '10px' }}
                                                />
                                            ) : (
                                                <a href={URL.createObjectURL(msg.file)} download={msg.file.name}>
                                                    {msg.file.name}
                                                </a>
                                            )
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {msg.sender === currentUser.id && (
                            <div className="message sent">
                                {msg.file ? (
                                    msg.file.type.startsWith('image/') ? (
                                        <img
                                            src={URL.createObjectURL(msg.file)}
                                            alt={msg.file.name}
                                            style={{ maxWidth: '100%', borderRadius: '10px' }}
                                        />
                                    ) : (
                                        <a href={URL.createObjectURL(msg.file)} download={msg.file.name}>
                                            {msg.file.name}
                                        </a>
                                    )
                                ) : (
                                    msg.content
                                )}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <ChatInput onSendMessage={(message, file) => {
                if (message.trim() !== '' || file) {
                    sendMessage(message, file);
                }
            }} showAttachButton={isFullScreen} />
        </div>
    );
};

export default ChatWindow;


