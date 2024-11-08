// src/Register/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    birthday: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/chatbot');
  };

  return (
    <div className="auth-container">
      <div className="logo">Cross Check</div>
      <div className="auth-content">
        <h1 className="auth-title">Register.</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="이름"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="아이디"
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value})}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <input
            type="text"
            placeholder="생년월일"
            value={formData.birthday}
            onChange={(e) => setFormData({...formData, birthday: e.target.value})}
          />
          <button type="submit" className="register-button">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default Register;