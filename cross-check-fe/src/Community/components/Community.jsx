import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import CommunityBoard from './CommunityBoard';
import '../css/community.css';

const Community = () => {
  const [activeBoard, setActiveBoard] = useState('free'); // 'free' or 'scam'
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <div className="community-container">
      <div className="community-content">
        <div className="board-tabs">
          <button
            className={`board-tab ${activeBoard === 'free' ? 'active' : ''}`}
            onClick={() => setActiveBoard('free')}
          >
            자유게시판
          </button>
          <button
            className={`board-tab ${activeBoard === 'scam' ? 'active' : ''}`}
            onClick={() => setActiveBoard('scam')}
          >
            전세사기 게시판
          </button>
          <div
            className="tab-indicator"
            style={{
              transform: `translateX(${activeBoard === 'free' ? '20px' : '180px'})`,
            }}
          />
        </div>
        <button className="write-btn" onClick={() => navigate('/Posting')}>
          <span>+</span>
          write
        </button>
        <CommunityBoard />
      </div>
    </div>
  );
};

export default Community;
