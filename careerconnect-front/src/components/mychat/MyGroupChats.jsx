import React from 'react';

const MyGroupChats = ({ groups, onSelectGroup, onDeleteGroup, onRenameGroup }) => {
    return (
        <div className="my-group-chats">
            <h2>나의 그룹 채팅방</h2>
            {groups.map((group) => (
                <div key={group.id} className="my-group-chat-item">
                    <span onClick={() => onSelectGroup(group)}>{group.name}</span>
                    <div className="group-actions">
                        <button onClick={() => onRenameGroup(group.id)}>이름 변경</button>
                        <button onClick={() => onDeleteGroup(group.id)}>삭제</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyGroupChats;