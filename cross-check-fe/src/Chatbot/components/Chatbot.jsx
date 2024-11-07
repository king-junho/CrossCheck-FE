import React from 'react';
import Sidebar from '../../Sidebar/components/Sidebar';
import '../css/chatbot.css';

function Chatbot() {
  return (
    <div className="chatbot-container">
      <Sidebar />
      <main className="chat-area">
        <div className="chat-messages">
          <div className="chat-bubble bot">
            <p>전세상담을 시작하겠습니다.</p>
          </div>
          <div className="chat-bubble bot">
            <p>전체 과정을 안내하고 전세 사기의 위험에 함께 접근할 수 있도록 도와드리겠습니다. 문서에 있는 정보가 이미 알고 있는 내용과 일치하는지 확인하는 것부터 시작하겠습니다. 임대하려는 부동산의 실제 주소를 입력해주세요.</p>
          </div>
          <div className="chat-bubble user">
            <p>서울특별시 삼성교로 8길 21 101호</p>
          </div>
          <div className="chat-bubble bot">
            <p>집주인의 성함과 주민등록번호를 입력해주세요.</p>
          </div>
          <div className="chat-bubble user">
            <p>우진희, 481105-2857390</p>
          </div>
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type the words..." />
          <button>▶</button>
        </div>
      </main>
    </div>
  );
}

export default Chatbot;