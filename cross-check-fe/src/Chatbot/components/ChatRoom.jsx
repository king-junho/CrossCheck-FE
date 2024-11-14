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

      // 파일을 Base64로 변환하는 함수
      const convertFileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = (error) => reject(error);
            });
      };

      // 메시지 전송 처리
      const handleSendMessage = async () => {
            if (!input.trim() && !selectedFile) return;

            let newMessage = {
                  type: 'user',
                  content: input.trim(),
                  align: 'right',
            };

            // 파일이 있는 경우 처리
            if (selectedFile) {
                  try {
                        const base64File = await convertFileToBase64(selectedFile);
                        newMessage.file = {
                              name: selectedFile.name,
                              data: base64File,
                              type: selectedFile.type
                        };
                  } catch (error) {
                        console.error('File conversion failed:', error);
                  }
            }

            setMessages(prev => [...prev, newMessage]);
            setInput('');
            setSelectedFile(null);
            if (fileInputRef.current) {
                  fileInputRef.current.value = '';
            }

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

      // Enter 키 처리
      const handleKeyPress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
            }
      };

      // 폼 제출 처리
      const handleSubmit = (e) => {
            e.preventDefault();
            handleSendMessage();
      };

      // 파일 선택 처리
      const handleFileSelect = (e) => {
            const file = e.target.files[0];
            if (file) {
                  // 파일 크기 체크 (예: 5MB 제한)
                  if (file.size > 5 * 1024 * 1024) {
                        alert('File size should not exceed 5MB');
                        return;
                  }
                  setSelectedFile(file);
                  // 선택된 파일 이름을 입력창에 표시 (선택사항)
                  setInput(prev => prev + ` [File: ${file.name}]`);
            }
      };

      const handleOptionClick = (option) => {
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
                            <div className="file-attachment">
                              <p>📎 {message.file.name}</p>
                              {message.file.type.startsWith('image/') && (
                                <img 
                                  src={message.file.data} 
                                  alt={message.file.name}
                                  style={{ maxWidth: '200px', marginTop: '8px' }}
                                />
                              )}
                            </div>
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
              <form onSubmit={handleSubmit} className="chat-input-wrapper">
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
                    onKeyPress={handleKeyPress}
                    placeholder="Type the words..."
                    className="chat-input"
                  />
                </div>
                <button type="submit" className="send-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20L4 12L12 4L13.425 5.425L7.825 11H20V13H7.825L13.425 18.575L12 20Z" fill="white" transform="rotate(180 12 12)"/>
                  </svg>
                </button>
              </form>
            </div>
          );
        };

export default ChatRoom;