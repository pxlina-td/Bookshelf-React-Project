import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after successful registration
import { registerUser } from '../api/users-api'; // Import the registerUser function
import '../styles/auth.css'; // External CSS for styling

const Register = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    repeatPassword: '',
    profilePic: '',
    bio: '',
  });

  // State for handling errors and loading state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use this to navigate after successful registration

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error

    // Validate passwords match
    if (formData.password !== formData.repeatPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    // Prepare the payload
    const payload = {
      username: formData.username,
      name: formData.name,
      password: formData.password,
      profilePic: formData.profilePic,
      bio: formData.bio,
    };

    try {
      // Call the registerUser function from user-api.js
      const result = await registerUser(payload);

      // Check if registration was successful
      if (result) {
        // Assuming result includes a token or user ID (e.g., result.token or result._id)
        localStorage.setItem('token', result.token); // Save token to localStorage

        // Redirect to the profile page
        navigate(`/profile/${result._id}`); // Adjust the path if needed based on your backend response
      } else {
        setError('Something went wrong during registration.');
      }
    } catch (err) {
      setError('Error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      <h1>Register</h1>
      {error && <p className="error-message">{error}</p>}
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
          type="url"
          name="profilePic"
          value={formData.profilePic}
          onChange={handleChange}
          placeholder="Profile Picture URL (optional)"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio (optional)"
        />
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;