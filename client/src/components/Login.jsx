import { useState } from 'react';
import { loginUser } from '../api/users-api'; 

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);  // For handling loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loading indicator when submitting

    try {
      const userData = await loginUser(formData);
      setSuccessMessage("Login successful!");
      setLoading(false);
      // Redirect or perform other actions after successful login
    } catch (err) {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      <h1>Login</h1>
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
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;