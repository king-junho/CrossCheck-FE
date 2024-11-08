// src/Login/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/chatbot');
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
            onChange={(e) => setFormData({...formData, id: e.target.value})}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <div className="button-group">
            <button type="submit">Login</button>
            <button type="button" onClick={() => navigate('/register')} className="secondary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;