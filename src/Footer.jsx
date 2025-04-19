import React from 'react';
import './assets/footer.css';

export function Footer() {  // Ensure this export is present
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3 className="footer-title">BuyNest</h3>
          <p className="footer-tagline">Your one-stop shop for all your needs</p>
        </div>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 BuyNest. All rights reserved.</p>
      </div>
    </footer>
  );
}


