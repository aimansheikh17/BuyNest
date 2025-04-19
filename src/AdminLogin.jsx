import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './assets/AdminLogin.css';

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === "CUSTOMER") {
          navigate("/customerhome");
        } else if (data.role === "ADMIN") {
          navigate("/admindashboard");
        } else {
          navigate("/admin"); // Redirect to a default page if role is unknown
        }
      } else {
        const errorMessage =
          data.error || "Something went wrong. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    }
  };

  return (
    <div className="page-layout1">
      <div className="page-container2">
        <div className="form-container2">
          <h1 className="form-title1">Admin Login</h1>
          {error && <p className="error-message1">{error}</p>}
          <form onSubmit={handleSignIn} className="form-content1">
            <div className="form-group">
              <label htmlFor="username" className="form-label1">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter Admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input1"
              />
            </div>
            <div className="form-group1">
              <label htmlFor="password" className="form-label1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="form-button7">
              Enter As Admin
            </button>
          </form>
          <div className="form-footer4">
            <a href="/" className="form-link5">
              Not Admin? Login As USer ! 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}