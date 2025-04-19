import React, { useState } from 'react';
import usericon from './assets/usericon.png';


import './assets/ProfileDropDown.css';
import { useNavigate } from 'react-router-dom';
 // Ensure this image exists
 // Import CSS for styling

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
  setIsOpen(!isOpen);
  };

  // Handle user logout (Replace with actual logout logic)
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/auth/logout', {
        method: 'POST', // Use POST as logout often involves session clearing
        credentials: 'include', // Include credentials like cookies for authentication
      });

      if (response.ok) {
        console.log('User successfully logged out');
        navigate('/'); // Redirect to login page
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const handleOrdersClick = () => {
    navigate('/orders'); // Navigate to the orders route
  };
  return (
    <div className="profile-dropdown">
      {/* Profile Button */}
      <button onClick={toggleDropdown}>
        <img src={usericon} alt="User Icon" />
        {username || 'Guest'}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#">Profile</a>
          <a href="OrderPage">Orders</a>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
