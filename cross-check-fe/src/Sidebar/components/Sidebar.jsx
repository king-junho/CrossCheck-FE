// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">Cross Check</h1>
      <button className="new-chat-btn" onClick={() => navigate('/chatbot')}>
        + Start a new chat
      </button>
      <nav className="sidebar-nav">
        <ul>
          <li 
            className={`nav-item ${location.pathname === '/chatbot' ? 'active' : ''}`}
            onClick={() => navigate('/chatbot')}
          >
            <span className="nav-icon">🤖</span>
            Chat Bot
          </li>
          <li 
            className={`nav-item ${location.pathname === '/history' ? 'active' : ''}`}
            onClick={() => navigate('/history')}
          >
            <span className="nav-icon">⏰</span>
            History
          </li>
          <li 
            className={`nav-item ${location.pathname === '/legal-service' ? 'active' : ''}`}
            onClick={() => navigate('/legal-service')}
          >
            <span className="nav-icon">⚖️</span>
            Legal Brokerage Service
          </li>
          <li 
            className={`nav-item ${location.pathname === '/community' ? 'active' : ''}`}
            onClick={() => navigate('/community')}
          >
            <span className="nav-icon">👥</span>
            Community
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;