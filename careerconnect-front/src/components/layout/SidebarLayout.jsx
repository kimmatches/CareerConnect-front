import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './SidebarLayout.css';
import { IoMenu } from 'react-icons/io5';

const SidebarLayout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
    const savedState = localStorage.getItem('isSidebarVisible');
    return savedState === 'true'; 
  });

  const toggleSidebar = () => {
    const newState = !isSidebarVisible;
    setIsSidebarVisible(newState);
    localStorage.setItem('isSidebarVisible', newState); 
  };

  return (
    <div className="layout-container">
      {!isSidebarVisible && (
        <div className="menu-button">
          <IoMenu size={30} color="black" onClick={toggleSidebar} />
        </div>
      )}
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <div className={`content-area ${isSidebarVisible ? 'shifted' : ''}`}>
        {children} 
      </div>
    </div>
  );
};

export default SidebarLayout;
