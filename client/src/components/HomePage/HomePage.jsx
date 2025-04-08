import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
      const { isAuthenticated} = useContext(AuthContext);

    return (
        <div>
            <header>
                <h1>Welcome to the Virtual Bookshelf</h1>
            </header>

            <section className="main-content">
                {/* Conditionally render if user is not logged in */}
                {!isAuthenticated && (
                    <>
                        <h2>Your Personal Library Awaits</h2>
                        <h2>Create an account and start making your shelf!</h2> 
                        <section className="buttons-section">
                        <button className="button login-btn" onClick={() => navigate('/login')}>Login</button>
                        <button className="button register-btn" onClick={() => navigate('/register')}>Register</button>
                    </section>
                    </>
                )}

                <div className="info-section right">
                    <div className="text">
                        <p>Explore a collection of books, keep track of ones you own and find new ones to read!</p>
                    </div>
                    <div className="image">
                        <img src="/assets/images/bookshelf-1.jpg" alt="Bookshelf image" />
                    </div>
                </div>

                <div className="info-section left">
                    <div className="text">
                        <p>Recreate your physical bookshelf and add your favourites. Have a digital copy of your home library!</p>
                    </div>
                    <div className="image">
                        <img src="/assets/images/books-2.jpg" alt="Books image" />
                    </div>
                </div>

                <div className='catalog-section'>
                    <h2 className='white'>
                        Take a look at the <Link to="/catalog" className="catalog-link">catalog</Link>!
                    </h2>
                </div>

            </section>
        </div>
    );
};

export default HomePage;