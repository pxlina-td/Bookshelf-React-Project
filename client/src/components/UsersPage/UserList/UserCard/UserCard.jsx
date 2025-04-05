import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

// UserCard Component
const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user.username}`} className="user-card-link">
      <div className="user-card">
        {/* Profile picture */}
        <img
          src={user.profilePic || '/assets/images/default-avatar.jpg'} // Default profile image if not provided
          alt={`${user.username}'s avatar`}
          className="user-avatar"
        />
        <div className="user-info">
          {/* Username with Link to user's profile page */}
          <h3 className="user-link">{user.username}</h3>
          {/* Full Name */}
          <p className="user-name">{user.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;