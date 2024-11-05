import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
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
    // 여기에 로그인 로직을 구현하세요
    console.log('Login attempt with:', formData);
  };

  return (
    <div className="login-container">
      <div className="logo">Cross Check</div>
      
      <h1 className="login-title">Login.</h1>
      
      <form className="login-form" onSubmit={handleSubmit}>
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
        
        <div className="button-group">
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="register-button">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Login;