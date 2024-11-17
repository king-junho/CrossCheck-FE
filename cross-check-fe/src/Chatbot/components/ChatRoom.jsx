// src/Chatbot/components/ChatRoom.jsx

// 실제 Chating이 진행되는 Page
import React, { useState, useRef, useEffect } from 'react';
import '../css/chatRoom.css';
import Sidebar from '../../Sidebar/components/Sidebar';
import { sendMessageToClaude } from '../../services/claudeService';


const ChatRoom = () => {
      <Sidebar />
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
      const [selectedFile, setSelectedFile] = useState(null);
      const [inputStep, setInputStep] = useState(1); // 입력 단계 상태 추가
      const messagesEndRef = useRef(null);
      const fileInputRef = useRef(null);

      const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      useEffect(() => {
            scrollToBottom();
      }, [messages]);

      const convertFileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = (error) => reject(error);
            });
      };

      const handleSendMessage = async () => {
            if (!input.trim() && !selectedFile) return;

            let newMessage = {
                  type: 'user',
                  content: input.trim(),
                  align: 'right',
            };

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

            // 입력창 초기화
            setInput('');
            setSelectedFile(null);
            if (fileInputRef.current) {
                  fileInputRef.current.value = '';
            }

            // 단계별 챗봇 응답 처리
            if (inputStep === 2) {  // 두 번째 단계: 성함 및 주민등록번호 입력
                  setTimeout(() => {
                        setMessages(prev => [...prev, {
                              type: 'bot',
                              content: '집주인의 실거주지를 입력해주세요.',
                              align: 'left'
                        }]);
                        setInputStep(3); // 다음 단계로 이동
                  }, 1000);
            }
            else if (inputStep === 3) {  // 세 번째 단계: 실거주지 입력
                  setTimeout(() => {
                        setMessages(prev => [...prev,
                        {
                              type: 'bot',
                              content: 'Document Verification',
                              align: 'left'
                        },
                        {
                              type: 'bot',
                              content: '아래 링크로 이동하여 평가를 위해 PDF 형식의 문서를 다운로드하여 주택 임대 사기의 위험이 있는지 확인하시기 바랍니다.',
                              align: 'left'
                        },
                        {
                              type: 'bot',
                              options: [
                                    '건물 등기사항전부증명서',
                                    '부동산 등기부등본',
                                    '납세 증명서',
                                    '지방세 납부 증명서'
                              ]
                        }
                        ]);
                        setInputStep(4); // Document Verification 단계로 이동
                  }, 1000);
            }
            else if (inputStep === 4) {  // Document Verification 이후 자유 대화
                  try {
                        const claudeResponse = await sendMessageToClaude([...messages, newMessage]);
                        setMessages(prev => [...prev, {
                              type: 'bot',
                              content: claudeResponse,
                              align: 'left'
                        }]);
                  } catch (error) {
                        console.error('Error getting response from Claude:', error);
                        setMessages(prev => [...prev, {
                              type: 'bot',
                              content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
                              align: 'left'
                        }]);
                  }
            }
      };

      // Document Verification 버튼 클릭 핸들러 추가
      const handleDocumentClick = (document) => {
            window.open('http://www.iros.go.kr/', '_blank');

            // 버튼 클릭 후 메시지 추가
            setMessages(prev => [...prev, {
                  type: 'user',
                  content: `${document} 확인하기`,
                  align: 'right'
            }]);
      };

      const handleKeyPress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
            }
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            handleSendMessage();
      };

      const handleFileSelect = (e) => {
            const file = e.target.files[0];
            if (file) {
                  if (file.size > 5 * 1024 * 1024) {
                        alert('File size should not exceed 5MB');
                        return;
                  }
                  setSelectedFile(file);
                  setInput(prev => prev + ` [File: ${file.name}]`);
            }
      };

      const handleOptionClick = async (option) => {
            const userMessage = { type: 'user', content: option, align: 'right' };
            setMessages(prev => [...prev, userMessage]);

            if (option === '전세상담') {
                  // 첫 번째 단계 시작
                  setTimeout(() => {
                        setMessages(prev => [...prev, {
                              type: 'bot',
                              content: '집주인의 성함과 주민등록번호를 입력해주세요.',
                              align: 'left'
                        }]);
                        setInputStep(2); // 다음 단계로 이동
                  }, 1000);
            }
            else if (option === '바로 질문하기') {
                  try {
                        const claudeResponse = await sendMessageToClaude([...messages.filter(msg => msg.content), userMessage]);
                        setMessages(prev => [...prev, {
                              type: 'bot',
                              content: claudeResponse,
                              align: 'left'
                        }]);
                  } catch (error) {
                        console.error('Error getting response from Claude:', error);
                        setMessages(prev => [...prev, {
                              type: 'bot',
                              content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
                              align: 'left'
                        }]);
                  }
            }
      };

      // 문서 설명을 반환하는 함수 추가
      const getDocumentDescription = (document) => {
            const descriptions = {
                  '건물 등기사항전부증명서': '건물에 관한 등기기록 사항의 전부 또는 일부를 증명하는 서면',
                  '부동산 등기부등본': '부동산에 관한 권리 관계를 적어 두는 등기부를 복사한 증명 문서',
                  '납세 증명서': '임대인에게 미지급 국세 납부액이 있는지 평가',
                  '지방세 납부 증명서': '임대인에게 미납 지방세 납부액이 있는지 평가'
            };
            return descriptions[document] || '';
      };

      return (
            <div className="chat-room">
                  <div className="chat-messages">
                        {messages.map((message, index) => (
                              <div key={index} className={`message ${message.type}`}>
                                    {message.type === 'bot' && (
                                          <div className="bot-icon">
                                                <img src="../chatbot-icon.png" alt="Bot" width="22" height="19" />
                                          </div>
                                    )}
                                    <div className="message-content">
                                          {message.content ? (
                                                <>
                                                      {typeof message.content === 'string' ? (
                                                            message.content.split('\n').map((line, i) => (
                                                                  <p key={i}>{line}</p>
                                                            ))
                                                      ) : (
                                                            <p>{message.content}</p>
                                                      )}
                                                </>
                                          ) : message.options ? (
                                                <div className="options-container">
                                                      {/* 일반 옵션 버튼인 경우 */}
                                                      {message.options.length === 2 ? (
                                                            message.options.map((option, idx) => (
                                                                  <button
                                                                        key={idx}
                                                                        className="option-button"
                                                                        onClick={() => handleOptionClick(option)}
                                                                  >
                                                                        {option}
                                                                  </button>
                                                            ))
                                                      ) : (
                                                            // Document Verification 버튼들인 경우
                                                            <div className="document-buttons-grid">
                                                                  {message.options.map((document, idx) => (
                                                                        <button
                                                                              key={idx}
                                                                              className="document-button"
                                                                              onClick={() => handleDocumentClick(document)}
                                                                        >
                                                                              {document}
                                                                              <p className="document-description">
                                                                                    {getDocumentDescription(document)}
                                                                              </p>
                                                                        </button>
                                                                  ))}
                                                            </div>
                                                      )}
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
                                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="#FF69B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                        <button
                              type="submit"
                              className={`send-button ${!input.trim() && !selectedFile ? 'disabled' : ''}`}
                              disabled={!input.trim() && !selectedFile}
                        >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 20L4 12L12 4L13.425 5.425L7.825 11H20V13H7.825L13.425 18.575L12 20Z" fill="white" transform="rotate(180 12 12)" />
                              </svg>
                        </button>
                  </form>
            </div>
      );
};

export default ChatRoom;
