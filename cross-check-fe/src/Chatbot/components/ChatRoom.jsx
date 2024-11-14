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
                  <form className="chat-input-container" onSubmit={handleSubmit}>
                        <input
                              type="text"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              placeholder="Type the words..."
                              className="chat-input"
                        />
                        <label className="file-upload-button">
                              📎
                              <input
                                    type="file"
                                    onChange={handleFileSelect}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                              />
                        </label>
                        <button type="submit" className="send-button">
                              ▶
                        </button>
                  </form>
            </div>
      );
};

export default ChatRoom;