// src/Chatbot/components/ChatRoomCreate.jsx

// 채팅방의 제목을 정하는 Page
import React, { useState } from 'react';
import '../css/chatRoomCreate.css';

const ChatRoomCreate = ({ onCreateRoom }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreateRoom(title);
  };

  return (
    <div className="chat-room-create">
      <h1 className="create-title">새로운 채팅방의 제목을 입력해주세요.</h1>
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 입력하기..."
          />
        </div>
        <button type="submit" className="create-button">
          채팅방 생성
        </button>
      </form>
    </div>
  );
};

export default ChatRoomCreate;