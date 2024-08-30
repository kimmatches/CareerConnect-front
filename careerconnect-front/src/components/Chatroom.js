import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useUser } from '../UserProvider';
import { useNavigate } from 'react-router-dom';
import './Chatroom.css';
import { Maximize, Minimize, ArrowLeft } from 'lucide-react';

const ChatRoom = () => {
    const { currentUser } = useUser();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            console.error("사용자 정보가 없습니다.");
            return;
        }

        const socket = new SockJS('http://localhost:8080/ws-chat');
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log(str);
            },
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("WebSocket 연결 성공");

                client.subscribe('/topic/group', onMessageReceived);

                client.publish({
                    destination: '/app/newUser',
                    body: JSON.stringify({ sender: currentUser.id, content: `${currentUser.id}님이 입장했습니다.` }),
                });
            },
            onStompError: (error) => {
                console.error('WebSocket 연결 중 오류 발생', error);
            },
        });

        client.activate();
        setStompClient(client);

        return () => {
            if (client) client.deactivate();
        };
    }, [currentUser]);

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        console.log("수신된 메시지:", message);
        setChatMessages((prevMessages) => [...prevMessages, message]);
    };

    const sendMessage = () => {
        if (stompClient && stompClient.connected && message.trim() !== '') {
            const chatMessage = {
                sender: currentUser.id,
                content: message,
            };

            stompClient.publish({
                destination: `/app/sendMessage`,
                body: JSON.stringify(chatMessage),
            });

            setMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const handleBack = () => {
        navigate('/groupchat');
    };

    return (
        <div className={`chat-room ${isMaximized ? 'maximized' : ''}`}>
            <div className="chat-header">
                <button className="back-btn" onClick={handleBack}>
                    <ArrowLeft size={24} />
                </button>
                <h2>채팅방</h2>
                <button className="maximize-btn" onClick={toggleMaximize}>
                    {isMaximized ? <Minimize size={24} /> : <Maximize size={24} />}
                </button>
            </div>
            <div className="messages">
                {chatMessages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === currentUser.id ? 'sent' : 'received'}`}>
                        {msg.sender !== currentUser.id && <div className="sender">{msg.sender}</div>}
                        <div className="content">{msg.content}</div>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="메시지를 입력하세요..."
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
};

export default ChatRoom;