import React, { useState } from 'react';
import Sidebar from '../../Sidebar/components/Sidebar';
import { useNavigate } from 'react-router-dom';
import '../css/history.css';

const History = () => {
  const navigate = useNavigate();

  const chatHistories = [
    { title: '전세를 위해 필요한 서류', time: '1시간 전' },
    { title: '전세사기 대처방법', time: '3일 전' },
    { title: '부동산 계약할 때 유의사항', time: '17일 전' },
    { title: '공인중개사가 되는 방법', time: '1달 전' }
  ];

  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [filteredChats, setFilteredChats] = useState(chatHistories); // 필터된 히스토리 관리

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase(); // 소문자로 변환
    setSearchTerm(searchValue);

    // 검색어에 따라 히스토리 필터링
    const filtered = chatHistories.filter((chat) =>
      chat.title.toLowerCase().includes(searchValue) // 검색어가 포함된 항목 필터링
    );
    setFilteredChats(filtered);
  };

  return (
    <div className="history-container">
      <Sidebar />
      <main className="history-main">
        <div className="history-header">
          <h1>Your chat history.</h1>
          <button className="new-chat-button" onClick={() => navigate('/chatbot')}>
            + start a new chat
          </button>
        </div>

        <div className="search-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search your chat"
              className="search-input"
              value={searchTerm} // 검색어 상태 바인딩
              onChange={handleSearchChange} // 검색어 변경 이벤트 핸들러
            />
          </div>
        </div>

        <div className="chat-history-list">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat, index) => (
              <div key={index} className="chat-history-item">
                <div className="chat-info">
                  <h3>{chat.title}</h3>
                  <span>{chat.time}</span>
                </div>
                <div className="chat-actions">
                  <button className="edit-button">✏️</button>
                  <button className="delete-button">🗑️</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No results found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
