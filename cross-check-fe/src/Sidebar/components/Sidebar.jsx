// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = () => {
      const navigate = useNavigate();
      const location = useLocation();
    
      const handleNewChat = () => {
        // 새로운 채팅 ID 생성 (예: 타임스탬프 사용)
        const newChatId = Date.now();
        
        // 새로운 채팅방으로 이동
        navigate(`/chatbot` );
        // ${newChatId}
      };
    
      return (
        <aside className="sidebar">
          <h1 className="sidebar-title">Cross Check</h1>
          <div className="new-chat-container">
            <button className="new-chat-btn" onClick={handleNewChat}>
              Start a new chat
            </button>
          </div>
    
          <nav className="sidebar-nav">
            <ul>
              <li 
                className={`nav-item chatbot ${location.pathname.includes('/chatbot') ? 'active' : ''}`}
                onClick={() => navigate('/chatbot')}
              >
                Chat Bot
              </li>
              <li 
                className={`nav-item history ${location.pathname === '/history' ? 'active' : ''}`}
                onClick={() => navigate('/history')}
              >
                History
              </li>
              <li 
                className={`nav-item legal-service ${location.pathname === '/legal-service' ? 'active' : ''}`}
                onClick={() => navigate('/legal-service')}
              >
                Legal Brokerage Service
              </li>
              <li 
                className={`nav-item community ${location.pathname === '/community' ? 'active' : ''}`}
                onClick={() => navigate('/community')}
              >
                Community
              </li>
            </ul>
          </nav>
        </aside>
      );
    };
    
export default Sidebar;