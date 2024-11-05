import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import Chatbot from '../../Chatbot/components/Chatbot.jsx';
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    birthday: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 회원가입 로직을 구현하세요
    console.log('Register attempt with:', formData);
    
    // 회원가입 로직이 성공하면 Chatbot 페이지로 이동
    navigate('/Chatbot');
  };

  return (
    <div className="register-container">
      <div className="logo">Cross Check</div>
      
      <div className="register-title">Register.</div>
      
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
        />
        
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={formData.id}
          onChange={handleChange}
          className="input-field"
        />
        
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
        />
        
        <input
          type="text"
          name="birthday"
          placeholder="생년월일"
          value={formData.birthday}
          onChange={handleChange}
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = formData.birthday ? 'date' : 'text')}
          className="input-field"
        />

        <button type="submit" className="register-register-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Register;
