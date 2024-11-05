import React, { useState } from 'react';
import './Register.css';

const Register = () => {
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
  };

  return (
    <div className="register-container">
      <div className="logo">Cross Check</div>
      
      <h1 className="register-title">Register.</h1>
      
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
          type="date"
          name="birthday"
          placeholder="생년월일"
          value={formData.birthday}
          onChange={handleChange}
          className="input-field"
        />
        
        <button type="submit" className="register-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Register;