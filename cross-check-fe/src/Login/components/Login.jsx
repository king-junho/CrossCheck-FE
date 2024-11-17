import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      loginId: formData.id,
      password: formData.password
    };

    try {
      const response = await fetch('http://localhost:3000/api/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();

      if (response.ok) {
        // 로그인 성공 처리
        console.log("로그인에 성공했습니다:", result.message);
        const accessToken = result.data.accessToken;
        // 토큰을 로컬 저장소에 저장하는 등의 후속 조치
        localStorage.setItem('accessToken', accessToken);
        navigate('/Chatbot'); // 로그인 성공 시 '/Chatbot' 페이지로 이동
      } else {
        // 상태 코드에 따른 오류 처리
        if (response.status === 400) {
          if (result.message === "사용자를 찾을 수 없습니다.") {
            alert("사용자를 찾을 수 없습니다.");
          } else if (result.message === "비밀번호가 일치하지 않습니다.") {
            alert("비밀번호가 일치하지 않습니다.");
          } else {
            alert("잘못된 요청입니다.");
          }
        } else {
          alert("로그인에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("요청 실패:", error);
      alert("서버와 통신에 실패했습니다.");
    }
  };

  return (
    <div className="auth-container">
      <div className="logo">Cross Check</div>
      <div className="auth-content">
        <h1 className="auth-title">Login.</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="아이디"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <div className="button-group">
            <button type="submit">Login</button>
            <button type="button" onClick={() => navigate('/Register')} className="secondary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
