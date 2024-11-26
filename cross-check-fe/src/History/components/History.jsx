import React, { useEffect, useState } from 'react';
import Sidebar from '../../Sidebar/components/Sidebar';
import { useNavigate } from 'react-router-dom';
import '../css/history.css';

const History = () => {
  const navigate = useNavigate();
  const [chatHistories, setChatHistories] = useState([]);

  useEffect(() => {
    const fetchChatHistories = async () => {
      try {
        const userId = "seungho0873";
        const response = await fetch(`https://qrwrsukdh4.execute-api.ap-northeast-2.amazonaws.com/getHistory?userId=${encodeURIComponent(userId)}`, {
          method: 'GET', // GET 메서드 사용
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setChatHistories(data); // 가져온 데이터 설정
      } catch (error) {
        console.error('Error fetching chat histories:', error);
      }
    };

    fetchChatHistories();
  }, []);
  const handleDeleteHistory = async (chatRoomId) => {
    try{
      const response = await fetch(`https://qrwrsukdh4.execute-api.ap-northeast-2.amazonaws.com/del_history`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({chatRoomId}),
      });

      if(!response.ok){
        throw new Error('Failed to delete chat room');
      }

      alert('채팅방이 삭제 되었습니다!');
      setChatHistories((prevHistories)=> prevHistories.filter(chat=>chat.chatRoomId!==chatRoomId));
    } catch(error){
      console.error('Error delete chat room: ',error);
      alert('채팅방 삭제 중 오류 발생');
    }
  };

  const handleEditChat = (chatRoomId) => {
    navigate(`/chatbot/${chatRoomId}`);
  }

  return (
    <div className="history-container">
      <Sidebar />
      <main className="history-main">
        <div className="history-header">
          <h1>Your chat history.</h1>
          <button className="new-chat-button" onClick={() => navigate('/chatbot')}>
            + start a new chat
          </button>
        </div>

        <div className="search-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search your chat"
              className="search-input"
            />
          </div>
        </div>

        <div className="chat-history-list">
          {chatHistories.map((chat, index) => (
            <div key={index} className="chat-history-item">
              <div className="chat-info">
                <h3>{chat.title}</h3>
                <span>{chat.time}</span>
              </div>
              <div className="chat-actions">
                <button className="edit-button" onClick={()=>handleEditChat(chat.chatRoomId)}>✏️</button>
                <button className="delete-button" onClick={()=>handleDeleteHistory(chat.chatRoomId)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default History;
