import React from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/CartIcon.css';


export function CartIcon({ count }) {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/UserCartPage');
  };

  return (
    <div className="cart-icon" onClick={handleCartClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="cart-icon-svg">
        <path d="M3 3h18l-2 9H5l-3 8h18a1.5 1.5 0 1 0 0-3h7a1.5 1.5 0 1 0 0-3h-7a1.5 1.5 0 1 0 0-3z" />
      </svg>
      <span className="cart-badge">{count}</span>
    </div>
  );
}
