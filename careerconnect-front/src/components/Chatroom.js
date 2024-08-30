import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useUser } from '../UserProvider'; 

const ChatRoom = () => {
    const { currentUser } = useUser();
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);

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
        if (stompClient && stompClient.connected) {
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

    return (
        <div className="chat-room">
            <h2>채팅방</h2>
            <div className="messages">
                {chatMessages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
            />
            <button onClick={sendMessage}>전송</button>
        </div>
    );
};

export default ChatRoom;
