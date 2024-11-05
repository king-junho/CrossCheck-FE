import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from '../src/Login/components/Login.jsx';
import Register from '../src/Register/components/Register.jsx';
import Community from '../src/Community/components/Community.jsx';
import LegalService from '../src/LegalService/components/LegalService.jsx';
import Chatbot from '../src/Chatbot/components/Chatbot.jsx';
import History from '../src/History/components/History.jsx';
const App = () => {
  return (
      <Router>
        <Routes>
          {/* 기본 라우트 */}
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          

          {/* Register 관련 라우트 */}
           <Route path="/Register" element={<Register />} /> 
        
          {/* History 관련 라우트 */}
          {/* <Route path="/History" element={<History />} /> */}

          {/* Community 관련 라우트 */}
          {/* <Route path="/Community" element={<Community />} /> */}

          {/* LegalService 관련 라우트 */}
          {/* <Route path="/LegalService" element={<LegalService />} /> */}
                            
          {/* Chatbot 관련 라우트 */}
          <Route path="/Chatbot" element={<Chatbot />} />
           
        </Routes>
      </Router>
  );
};

export default App;