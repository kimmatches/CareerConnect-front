import React, { useState, useRef } from 'react';
import { MdOutlineAttachFile, MdInsertEmoticon } from 'react-icons/md'; 
import EmojiPicker from 'emoji-picker-react'; 
import './ChatInput.css'; 

const ChatInput = ({ onSendMessage, showAttachButton }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (newMessage.trim() || selectedFile) {
      onSendMessage(newMessage, selectedFile);
      setNewMessage('');
      setSelectedFile(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiClick = (event, emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji); 
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-input-container">
      {showEmojiPicker && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      {showAttachButton && (
        <>
          <button className="emoji-button" onClick={toggleEmojiPicker}>
            <MdInsertEmoticon style={{ color: 'black' }} />
          </button>
          <button className="attach-button" onClick={handleAttachClick}>
            <MdOutlineAttachFile style={{ color: 'black' }} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </>
      )}
      {selectedFile && (
        <div className="file-info">
          <span>{selectedFile.name}</span>
        </div>
      )}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="메시지를 입력하세요..."
        className="chat-input-field"
      />
      <button onClick={handleSend} className="chat-send-button">
        전송
      </button>
    </div>
  );
};

export default ChatInput;
