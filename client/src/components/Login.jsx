import React, { useState } from 'react';
import "../styles/auth.css";

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

    try {
      const res = await fetch("http://localhost:3030/jsonstore/bookshelf/users");
      const users = await res.json();

      const matchedUser = Object.entries(users).find(([id, user]) =>
        user.username === formData.username && user.password === formData.password
      );

      if (matchedUser) {
        const [userId, userData] = matchedUser;
        setSuccessMessage("Login successful!");
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", userData.username);
        setError('');
      } else {
        setError("Invalid username or password");
      }

    } catch (err) {
      console.error(err);
      setError("Error connecting to the server");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      <h1>Log in</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
