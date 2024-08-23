import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';
import { FaPencilAlt } from 'react-icons/fa'; 

const MyPage = () => {
    const [isOnline, setIsOnline] = useState(true); 
    const [isEditing, setIsEditing] = useState(false); 
    const [name, setName] = useState("나의 이름"); 
    const navigate = useNavigate();

    const toggleOnlineStatus = () => {
        setIsOnline(!isOnline);
    };

    const handleDeleteAccount = () => {
        alert("계정이 탈퇴되었습니다.");
    };

    const handleLogout = () => {
        alert("로그아웃 되었습니다.");
        navigate('/');
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    return (
        <div className="mypage-container">
            <div className="profile-avatar">
                <div className="avatar-icon">나</div>
            </div>
            <div className="profile-info">
                {isEditing ? (
                    <form onSubmit={handleNameSubmit} className="name-edit-form">
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="name-input"
                            autoFocus
                        />
                        <button type="submit" className="save-button">저장</button>
                    </form>
                ) : (
                    <div className="name-display">
                        <h2 className="profile-name">{name}</h2>
                        <FaPencilAlt className="edit-icon" onClick={toggleEditing} /> 
                    </div>
                )}
                <p className="profile-id">ID: myusername</p>
            </div>
            <button className="status-button" onClick={toggleOnlineStatus}>
                {isOnline ? '활동 중' : '오프라인'}
            </button>
            <button className="delete-button" onClick={handleDeleteAccount}>
                탈퇴하기
            </button>
            <button className="logout-button" onClick={handleLogout}>
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;
