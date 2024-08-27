import React, { useState, useRef } from 'react';
import { MdOutlineAttachFile, MdInsertEmoticon } from 'react-icons/md';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, showAttachButton }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (newMessage.trim() || selectedFile) {
      onSendMessage(newMessage, selectedFile);
      setNewMessage('');
      setSelectedFile(null);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = null; 
      }
      
      setShowConfirmationPopup(false);
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
      const file = e.target.files[0];

      if (file.type.startsWith('image/')) {
        resizeImage(file, 400, 400, (resizedFile) => {
          setSelectedFile(resizedFile);
          setShowConfirmationPopup(true); 
        });
      } else {
        setSelectedFile(file); 
        setShowConfirmationPopup(true);
      }
    }
  };

  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });
          callback(resizedFile);
        }, file.type);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiClick = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleConfirmSend = () => {
    handleSend(); 
  };

  const handleCancelSend = () => {
    setSelectedFile(null); 
    setShowConfirmationPopup(false);
  };

  return (
    <div className="chat-input-container">
      {showEmojiPicker && (
        <div className="emoji-picker">
          <Picker data={data} onEmojiSelect={onEmojiClick} />
        </div>
      )}
      {showAttachButton && (
        <>
          <button className="emoji-button" onClick={toggleEmojiPicker}>
            <MdInsertEmoticon className="icon" />
          </button>
          <button className="attach-button" onClick={handleAttachClick}>
            <MdOutlineAttachFile className="icon" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </>
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

      {showConfirmationPopup && (
        <div className="confirmation-popup">
          <p>파일을 전송하시겠습니까?</p>
          {selectedFile && (
            <div className="popup-file-name">
              <span>{selectedFile.name}</span>
            </div>
          )}
          <div className="popup-buttons">
            <button onClick={handleConfirmSend}>예</button>
            <button onClick={handleCancelSend}>아니오</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
