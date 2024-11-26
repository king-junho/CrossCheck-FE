// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar/components/Sidebar';
import Login from './Login/components/Login';
import Register from './Register/components/Register';
import Chatbot from './Chatbot/components/Chatbot';
import Community from './Community/components/Community';
import History from './History/components/History';
import LegalService from './LegalService/components/LegalService';
import ChatRoom from './Chatbot/components/ChatRoom';
import ChatRoomCreate from './Chatbot/components/ChatRoomCreate';
import Posting from "./Community/components/Posting";
import PostDetail from "./Community/components/PostDetail";
import CommunityBoard from "./Community/components/CommunityBoard";
import "./App.css";

// Sidebar 포함 레이아웃
const AppLayout = ({ children }) => {
  return (
    <div className="app">
      <Sidebar />
      {children}
    </div>
  );
};

// 전체 App 컴포넌트
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (with Sidebar) */}
        <Route
          path="/chatbot"
          element={
            <AppLayout>
              <Chatbot />
            </AppLayout>
          }
        />
        <Route
          path="/chatbot/:chatId"
          element={
            <AppLayout>
              <ChatRoom />
            </AppLayout>
          }
        />
        <Route
          path="/chatroomcreate"
          element={
            <AppLayout>
              <ChatRoomCreate />
            </AppLayout>
          }
        />
        <Route
          path="/community"
          element={
            <AppLayout>
              <Community />
            </AppLayout>
          }
        />
        <Route
          path="/posting"
          element={
            <AppLayout>
              <Posting />
            </AppLayout>
          }
        />
        <Route
          path="/communityboard"
          element={
            <AppLayout>
              <CommunityBoard />
            </AppLayout>
          }
        />
        <Route
          path="/post/:id"
          element={
            <AppLayout>
              <PostDetail />
            </AppLayout>
          }
        />
        <Route
          path="/history"
          element={
            <AppLayout>
              <History />
            </AppLayout>
          }
        />
        <Route
          path="/legalservice"
          element={
            <AppLayout>
              <LegalService />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
