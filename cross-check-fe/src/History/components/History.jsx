import React, { useState } from 'react';
import './History.css';
import { Search, Bell, User, Plus, Robot, Clock, Scale, MessageSquare, Trash2 } from 'lucide-react';

const History = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const chatHistory = [
    { id: 1, title: '전세를 위해 필요한 서류', time: '1시간 전' },
    { id: 2, title: '전세사기 대처방법', time: '3일 전' },
    { id: 3, title: '부동산 계약할 때 유의사항', time: '17일 전' },
    { id: 4, title: '공인중개사가 되는 방법', time: '1달 전' },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    // 삭제 로직 구현
    console.log('Delete chat:', id);
  };

  return (
    <div className="history-layout">
      <div className="sidebar">
        <div className="logo">Cross Check</div>
        
        <div className="new-chat">
          <Plus size={16} />
          <input 
            type="text" 
            placeholder="Start a new chat"
            className="new-chat-input"
          />
        </div>

        <nav className="nav-menu">
          <div className="nav-item">
            <Robot size={20} />
            <span>Chat Bot</span>
          </div>
          <div className="nav-item active">
            <Clock size={20} />
            <span>History</span>
          </div>
          <div className="nav-item">
            <Scale size={20} />
            <span>Legal Brokerage Service</span>
          </div>
          <div className="nav-item">
            <MessageSquare size={20} />
            <span>Community</span>
          </div>
        </nav>
      </div>

      <main className="main-content">
        <header className="top-header">
          <h1>Your chat history.</h1>
          <div className="header-icons">
            <Bell className="icon" />
            <User className="icon" />
          </div>
        </header>

        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search your chat"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="chat-history">
          {chatHistory.map((chat) => (
            <div key={chat.id} className="chat-item">
              <div className="chat-info">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-time">{chat.time}</div>
              </div>
              <button 
                className="delete-button"
                onClick={() => handleDelete(chat.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <button className="new-chat-button">
          <Plus size={16} />
          start a new chat
        </button>
      </main>
    </div>
  );
};

export default History;