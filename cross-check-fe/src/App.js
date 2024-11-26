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
import ChatRoom from './Chatbot/components/ChatRoom'
import ChatRoomCreate from './Chatbot/components/ChatRoomCreate';
import Posting from "./Community/components/Posting";
import PostDetail from "./Community/components/PostDetail";
import CommunityBoard from "./Community/components/CommunityBoard";
import "./App.css";

const AppLayout = ({ children }) => {
      return (
            <div className="app">
                  <Sidebar />
                  {children}
            </div>
      );
};

const App = () => {
      return (
            <Router>
                  <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected routes with Sidebar */}
                        <Route
                              path="/chatbot"
                              element={
                                    <AppLayout>
                                          <Chatbot />
                                    </AppLayout>
                              }
                        />

                        <Route path="/chatbot/:chatId" element={<ChatRoom />} />

                        <Route
                              path="/chatroomcreate"
                              element={
                                    <AppLayout>
                                          <ChatRoomCreate />
                                    </AppLayout>
                              }
                        />
                        <Route
                              path="/Community"
                              element={
                                    <AppLayout>
                                          <Community />
                                    </AppLayout>
                              }
                        />

                        <Route path="/Posting" element={<Posting />} />
                        <Route path="/" element={<CommunityBoard />} />
                        <Route path="/post/:id" element={<PostDetail />} /> {/* 상세 페이지 라우팅 */}

                        <Route
                              path="/History"
                              element={
                                    <AppLayout>
                                          <History />
                                    </AppLayout>
                              }
                        />

                        <Route path="/history" element={<History />} />

                        <Route
                              path="/LegalService"
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