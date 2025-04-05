import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.css';
import { getAllUsers } from '../../../api/users-api';
import UserCard from './UserCard/UserCard';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getAllUsers();

        if (data) {
          setUsers(Object.values(data)); // Converts { user1: {...}, user2: {...} } to [ {...}, {...} ]
        } else {
          setError('Failed to load users.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      {error && <div className="error">{error}</div>}

      {loading ? (
        <div>Loading users...</div>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;