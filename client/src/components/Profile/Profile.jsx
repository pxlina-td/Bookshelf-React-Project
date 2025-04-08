import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfile();
        setUserData(user);
        setLoading(false);
      } catch (err) {
        setError('You are not logged in or session expired');
        setLoading(false);
        navigate('/login');  // Redirect to login if not authenticated
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    loading ? <p>Loading...</p> :
    error ? <p>{error}</p> :
    (
      <>
        <h1>Your Profile</h1>
        <div className="profile-container">
          <h1>{userData.username}'s Profile</h1>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p> {/* Adjust according to your user data */}
          <img src={userData.profilePicture} alt="Profile" /> {/* If profile picture exists */}
        </div>
      </>
    )
  );
}