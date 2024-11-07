import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져오기 위해 useLocation 사용

  // 현재 경로에 따라 active 여부를 확인하는 함수
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <div className="logo">Cross Check</div>
      
      <button className="new-chat-btn" onClick={() => navigate('/chatbot')}>
        <span className="plus-icon">+</span> Start a new chat
      </button>
      
      <nav className="nav-menu">
        <ul>
          <li 
            className={`menu-item ${isActive('/chatbot') ? 'active' : ''}`}
            onClick={() => navigate('/chatbot')}
          >
            <span className="icon">🤖</span>
            Chat Bot
          </li>
          <li 
            className={`menu-item ${isActive('/history') ? 'active' : ''}`}
            onClick={() => navigate('/history')}
          >
            <span className="icon">⏰</span>
            History
          </li>
          <li 
            className={`menu-item ${isActive('/legal-service') ? 'active' : ''}`}
            onClick={() => navigate('/legal-service')}
          >
            <span className="icon">⚖️</span>
            Legal Brokerage Service
          </li>
          <li 
            className={`menu-item ${isActive('/community') ? 'active' : ''}`}
            onClick={() => navigate('/community')}
          >
            <span className="icon">👥</span>
            Community
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;