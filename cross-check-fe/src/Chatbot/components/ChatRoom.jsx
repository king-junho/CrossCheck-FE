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
      const [selectedFile, setSelectedFile] = useState(null);
      const [inputStep, setInputStep] = useState(0);
      const [areOptionsDisabled, setAreOptionsDisabled] = useState(false);
      const [rentalInfo, setRentalInfo] = useState({
            address: '',
            landlordName: '',
            landlordIdNumber: '',
            landlordResidence: '',
      });

      const messagesEndRef = useRef(null);
      const fileInputRef = useRef(null);
      const [isSending, setIsSending] = useState(false); // 중복으로 메세지 보내지는 것 방지

      const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      useEffect(() => {
            scrollToBottom();
      }, [messages]);

      useEffect(()=>{
            const fetchChatMessages = async() =>{
                  const chatRoomId = sessionStorage.getItem('currentChatRoomId');
                  if(!chatRoomId) return;

                  const response = await fetch(`https://qrwrsukdh4.execute-api.ap-northeast-2.amazonaws.com/getDetailedHistory?chatRoomId=${chatRoomId}`,{
                        method:'GET',
                        headers :{
                              'Content-Type':'application/json',
                        }
                  });
                  if (response.ok) {
                        const data = await response.json();
                        
                        // 메시지를 user와 bot 타입으로 저장
                        const newMessages = data.flatMap(msg => [
                            {
                                type: 'user',
                                content: msg.content
                            },
                            {
                                type: 'bot',
                                content: msg.claudeResponse
                            }
                        ]);
            
                        // 상태 업데이트
                        setMessages(prevMessages => {
                              // 중복된 메시지를 제거한 새로운 메시지 배열 생성
                              const uniqueMessages = [...prevMessages, ...newMessages].filter((message, index, self) =>
                                  index === self.findIndex((m) => m.content === message.content && m.type === message.type)
                              );
                              return uniqueMessages;
                          });
                    } else {
                        console.error('Failed to fetch chat messages');
                    }
            };
            fetchChatMessages();
      },[]);

      const convertFileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = (error) => reject(error);
            });
      };

      const sendToApiGateway = async (payload) => {
            const url = 'https://qrwrsukdh4.execute-api.ap-northeast-2.amazonaws.com/send_message';
            try {
                  const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                  });

                  if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Server Error:', errorData);
                        throw new Error('Server Error');
                  }

                  return await response.json();
            } catch (error) {
                  console.error('Communication error:', error);
                  throw error;
            }
      };

      const handleKeyPress = async (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // 먼저 기본 동작을 막습니다
                  if (!input.trim() && !selectedFile) return;
                  await handleSendMessage();
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            if (!input.trim() && !selectedFile) return;
            await handleSendMessage();
      };

      const handleSendMessage = async (e) => {
            if (isSending) return;

            try {
                  setIsSending(true); // Set sending state
                  const currentInput = input.trim(); // 현재 입력값을 저장
                  const currentFile = selectedFile; // Store current file

                  // Clear input and file immediately
                  setInput('');
                  setSelectedFile(null);

                  const newMessage = { type: 'user', content: currentInput.trim(), align: 'right' };
                  setMessages((prev) => [...prev, newMessage]);

                  // 단계별 챗봇 응답 처리
                  if (inputStep === 1) {
                        setRentalInfo((prev) => ({ ...prev, address: currentInput }));
                        setMessages(prev => [...prev, {
                              type: 'bot',
                              content: '집주인의 성함과 주민등록번호를 ,로 구분하여 입력해주세요.',
                              align: 'left'
                        }]);
                        setInputStep(2);
                  } else if (inputStep === 2) {
                        const [name, idNumber] = currentInput.split(',').map(item => item.trim());
                        setRentalInfo((prev) => ({
                              ...prev,
                              landlordName: name || '',
                              landlordIdNumber: idNumber || ''
                        }));
                        setMessages(prev => [...prev, {
                              type: 'bot',
                              content: '집주인의 실거주지를 입력해주세요.',
                              align: 'left'
                        }]);
                        setInputStep(3);
                  } else if (inputStep === 3) {
                        setRentalInfo((prev) => ({ ...prev, landlordResidence: currentInput }));
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
                        },
                        {
                              type: 'bot',
                              content: '지금부터 다운로드한 PDF 파일을 업로드 하거나 자유롭게 질문해주세요!',
                              align: 'left'
                        }
                        ]);
                        setInputStep(4);
                  } else if (inputStep === 4 || inputStep >= 5) {
                        const payload = {
                              chatRoomId: sessionStorage.getItem('currentChatRoomId'),
                              content: currentInput,
                              type: currentFile ? 'file' : 'text',
                              file: currentFile ? await convertFileToBase64(currentFile) : null,
                              fileName: currentFile?.name,
                              ...(inputStep === 4 && { rentalInfo }),
                        };

                        try {
                              const apiResponse = await sendToApiGateway(payload);
                              setMessages((prev) => [...prev, {
                                    type: 'bot',
                                    content: apiResponse.claudeResponse,
                                    align: 'left'
                              }]);
                              if (inputStep === 4) setInputStep(5);
                        } catch (error) {
                              setMessages((prev) => [...prev, {
                                    type: 'bot',
                                    content: '응답을 처리하는 중 오류가 발생했습니다.',
                                    align: 'left'
                              }]);
                        }
                  }
            } finally {
                  setIsSending(false);
            }
      };

      const handleDocumentClick = (document) => {
            window.open('http://www.iros.go.kr/', '_blank');

            setMessages(prev => [...prev, {
                  type: 'user',
                  content: `${document} 확인하기`,
                  align: 'right'
            }]);
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
            if (areOptionsDisabled) return;

            const userMessage = { type: 'user', content: option, align: 'right' };
            setMessages(prev => [...prev, userMessage]);
            setAreOptionsDisabled(true);

            if (option === '전세상담') {
                  setMessages(prev => [...prev, {
                        type: 'bot',
                        content: '전세상담을 시작하겠습니다.\n전체 과정을 안내하고 전세 사기의 위험에 함께 접근할 수 있도록 도와드리겠습니다.\n문서에 있는 정보가 이미 알고 있는 내용과 일치하는지 확인하는 것부터 시작하겠습니다.\n임대하려는 부동산의 실제 주소를 입력해주세요.',
                        align: 'left'
                  }]);
                  setInputStep(1);
            } else if (option === '바로 질문하기') {
                  setMessages(prev => [...prev, {
                        type: 'bot',
                        content: '무엇이든 편하게 질문해주세요!',
                        align: 'left'
                  }]);
                  setInputStep(5);
            }
      };

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
      <div className="chatbot-container">
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
                              <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type the words..."
                                    className="chat-input"
                                    rows={1}
                                    style={{
                                          resize: 'none',
                                          minHeight: '40px',
                                          maxHeight: '120px',
                                          overflowY: 'auto'
                                    }}
                                    disabled={isSending}
                              />
                        </div>
                        <button
                              type="submit"
                              className={`send-button ${!input.trim() && !selectedFile ? 'disabled' : ''}`}
                              disabled={!input.trim() && !selectedFile || isSending}
                        >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 20L4 12L12 4L13.425 5.425L7.825 11H20V13H7.825L13.425 18.575L12 20Z" fill="white" transform="rotate(180 12 12)" />
                              </svg>
                        </button>
                  </form>
            </div>
      </div>
      );
};

export default ChatRoom;