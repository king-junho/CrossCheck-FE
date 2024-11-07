import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="logo">Cross Check</div>
      
      <button className="new-chat-btn">
        <span className="plus-icon">+</span> Start a new chat
      </button>
      
      <nav className="nav-menu">
        <ul>
          <li className="menu-item active">
            <span className="icon">🤖</span>
            Chat Bot
          </li>
          <li className="menu-item">
            <span className="icon">⏰</span>
            History
          </li>
          <li className="menu-item">
            <span className="icon">⚖️</span>
            Legal Brokerage Service
          </li>
          <li className="menu-item">
            <span className="icon">👥</span>
            Community
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;