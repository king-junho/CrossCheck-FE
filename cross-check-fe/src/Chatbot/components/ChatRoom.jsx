// src/Chatbot/components/ChatRoom.jsx

// 실제 Chating이 진행되는 Page
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
      const [selectedFile, setSelectedFile] = useState(null);   // 파일 상태 관리를 위한 state 
      const messagesEndRef = useRef(null);
      const fileInputRef = useRef(null);   // 파일 상태 관리를 위한 state 

      const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      useEffect(() => {
            scrollToBottom();
      }, [messages]);

      const handleSubmit = (e) => {
            e.preventDefault();
            if (!input.trim()) return;

            // 사용자 메시지 추가
            setMessages(prev => [...prev, { type: 'user', content: input, align: 'right' }]);
            setInput('');

            // 챗봇 응답 시뮬레이션
            if (input === '서울특별시 삼선교로 8길 21 101호') {
                  setTimeout(() => {
                        setMessages(prev => [...prev, {
                              type: 'bot',
                              content: '집주인의 성함과 주민등록번호를 입력해주세요.',
                              align: 'left'
                        }]);
                  }, 1000);
            }
      };

      // 파일 선택 핸들러
      const handleFileSelect = (e) => {
            const file = e.target.files[0];
            if (file) {
                  setSelectedFile(file);
            }
      };

      const handleOptionClick = (option) => {
            // 선택된 옵션을 사용자 메시지로 추가
            setMessages(prev => [...prev, { type: 'user', content: option, align: 'right' }]);

            if (option === '전세상담') {
                  setTimeout(() => {
                        setMessages(prev => [...prev,
                        { type: 'bot', content: '전세상담을 시작하겠습니다.', align: 'left' },
                        { type: 'bot', content: '전체 과정을 안내하고 전세 사기의 위험에 함께 점근할 수 있도록 도와드리겠습니다.\n문서에 있는 정보가 이미 알고 있는 내용과 일치하는지 확인하는 것부터 시작하겠습니다.\n임대하려는 부동산의 실체 주소를 입력해주세요.', align: 'left' }
                        ]);
                  }, 1000);
            }
      };

      return (
            <div className="chat-room">
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.type}`}>
                    {message.type === 'bot' && (
                      <div className="bot-icon">
                        <img src="./chatbot-icon.png" alt="Bot" width="22" height="19" />
                      </div>
                    )}
                    <div className="message-content">
                      {message.content ? (
                        <>
                          {message.content.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                          {message.file && (
                            <p className="file-attachment">
                              📎 {message.file.name}
                            </p>
                          )}
                        </>
                      ) : message.options ? (
                        <div className="options-container">
                          {message.options.map((option, idx) => (
                            <button 
                              key={idx} 
                              className="option-button"
                              onClick={() => handleOptionClick(option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="chat-input-wrapper">
                <div className="chat-input-container">
                  <label className="file-upload-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="#FF69B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type the words..."
                    className="chat-input"
                  />
                </div>
                <button type="submit" className="send-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20L4 12L12 4L13.425 5.425L7.825 11H20V13H7.825L13.425 18.575L12 20Z" fill="white" transform="rotate(180 12 12)"/>
                  </svg>
                </button>
              </div>
            </div>
          );
        };
        
        export default ChatRoom;