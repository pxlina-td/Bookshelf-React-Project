import React, { useState } from 'react';
import "../../styles/auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    repeatPassword: '',
    profilePic: '',
    bio: ''
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

    if (formData.password !== formData.repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    const userData = {
      username: formData.username,
      name: formData.name,
      password: formData.password,
      profilePic: formData.profilePic,
      bio: formData.bio || ''
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registration successful! You are now logged in.');
        localStorage.setItem('authToken', data.token); // Automatically log in
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
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
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
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
        <input
          type="password"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          placeholder="Repeat Password"
          required
        />
        <input
          type="text"
          name="profilePic"
          value={formData.profilePic}
          onChange={handleChange}
          placeholder="Profile Picture URL"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio (Optional)"
        ></textarea>
        <button type="submit" className="auth-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
