// src/Chatbot/components/ChatRoom.jsx
// src/Chatbot/components/ChatRoom.jsx
import React, { useState, useRef, useEffect } from 'react';
import '../css/chatRoom.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: '안녕하세요. 저는 크로스 체크의 챗봇입니다.'
    },
    {
      type: 'bot',
      options: ['전세상담', '바로 질문하기']
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');
  };

  return (
    <div className="chat-room">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.type === 'bot' && (
              <div className="bot-icon">
                <img src="/chatbot-icon.png" alt="Bot" width="20" height="20" />
              </div>
            )}
            <div className="message-container">
              {message.content && (
                <div className="message-content">
                  {message.content}
                </div>
              )}
              {message.options && (
                <div className="options-container">
                  {message.options.map((option, idx) => (
                    <button key={idx} className="option-button">
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-wrapper">
        <form className="chat-input-container" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type the words..."
            className="chat-input"
          />
          <button type="submit" className="send-button">
            ▶
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;