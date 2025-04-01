import React, { useState } from 'react';
import "../../styles/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: formData.username,
      password: formData.password
    };

    try {
      const response = await fetch("http://localhost:5000/login", { //add correct path
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Login successful!');
        localStorage.setItem('authToken', data.token); // Store the JWT token
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div> {/* This div is for the background */}
      <h1>Log in</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
};

export default Login;