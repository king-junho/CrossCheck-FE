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
          <div className="new-chat-container">
            <button className="new-chat-btn" onClick={() => navigate('/Chatbot')}>
              Start a new chat
            </button>
          </div>
    
          <nav className="sidebar-nav">
            <ul>
              <li 
                className={`nav-item chatbot ${location.pathname.includes('/Chatbot') ? 'active' : ''}`}
                onClick={() => navigate(`/Chatbot/${sessionStorage.getItem('currentChatRoomId')}`)}
              >
                Chat Bot
              </li>
              <li 
                className={`nav-item history ${location.pathname === '/History' ? 'active' : ''}`}
                onClick={() => navigate('/History')}
              >
                History
              </li>
              <li 
                className={`nav-item legal-service ${location.pathname === '/LegalService' ? 'active' : ''}`}
                onClick={() => navigate('/LegalService')}
              >
                Legal Brokerage Service
              </li>
              <li 
                className={`nav-item community ${location.pathname === '/Community' ? 'active' : ''}`}
                onClick={() => navigate('/Community')}
              >
                Community
              </li>
            </ul>
          </nav>
        </aside>
      );
    };
    
export default Sidebar;