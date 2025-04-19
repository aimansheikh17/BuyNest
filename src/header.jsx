import React from "react";
import { CartIcon } from "./CartIcon";
import { ProfileDropdown } from "./ProfileDropdown";
import "./assets/header.css"; // Import the updated CSS file

export function Header({ cartCount, username }) {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">Buy <span>Nest</span></div>

        {/* Cart & Profile Section */}
        <div className="header-actions">
          <CartIcon count={cartCount} />
          <ProfileDropdown username={username} />
        </div>
      </div>
    </header>
  );
}

export default Header;


