import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../api/auth-api';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('User is not logged in');
        navigate('/login');
        return;
      }

      try {
        const userData = await getMe(); // Directly get the parsed data

        if (userData) { // Check if user data is received
          setUser(userData); // Store user data in the state
        } else {
          setError('Error fetching profile data');
          navigate('/login');
        }
      } catch (err) {
        setError('Error fetching profile data');
        console.error('Error:', err);
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="profile-container">

      <div className="profile-image-container">
        <img
          src={user.profilepic || '/assets/images/default-avatar.jpg'} // Fallback to a default avatar if missing
          alt={`${user.name}'s avatar`}
          className="profile-image"
        />
      </div>
      <div className="profile-header">
        <h1 className="profile-username">{user.name}'s Profile</h1>
      </div>
      <div className="profile-info">
        <p className="profile-info-item">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="profile-info-item">
          <strong>Bio:</strong> {user.bio || 'No bio provided.'}
        </p>
        <div className="profile-shelf">
          <strong>Shelf:</strong>
          {user.shelf?.length > 0 ? (
            <ul>
              {user.shelf.map((book, index) => (
                <li key={index}>
                  <img src={book.coverImage} alt={book.title} className="profile-shelf-book-cover" />
                  <p>{book.title} by {book.author}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books added to shelf yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
