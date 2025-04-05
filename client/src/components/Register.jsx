import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after successful registration
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
      // Call the API to register the user
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // Check if registration was successful
      if (response.ok) {
        // Redirect to the login page or a success page
        navigate('/login');
      } else {
        setError(result.message || 'Something went wrong during registration.');
      }
    } catch (err) {
      setError('Error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="profilePic">Profile Picture URL (optional):</label>
          <input
            type="url"
            id="profilePic"
            name="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio (optional):</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;