// src/Layout/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Sidebar/components/Sidebar';
import '../css/layout.css';

const Layout = () => {
      return (
            <div className="layout-container">
                  <Sidebar />
                  <div className="layout-content">
                        <Outlet />
                  </div>
            </div>
      );
};

export default Layout;