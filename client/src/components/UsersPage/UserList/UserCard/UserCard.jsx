import React from 'react';
import { Link } from 'react-router-dom'; // For navigation to user's profile page
import './UserCard.css'; // External CSS for styling

// UserCard Component
export default function UserCard({ user }) {
  return (
    <div className="user-card">
      {/* Profile picture */}
      <img
        src={user.profilePic || '/assets/images/default-avatar.png'} // Default profile image if not provided
        alt={`${user.username}'s avatar`}
        className="user-avatar"
      />
      <div className="user-info">
        {/* Username with Link to user's profile page */}
        <h3>
          <Link to={`/profile/${user.username}`} className="user-link">
            {user.username}
          </Link>
        </h3>
        {/* Full Name */}
        <p className="user-name">{user.name}</p>
      </div>
    </div>
  );
}