import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../api/auth';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <header>
                <h1>Welcome to the Virtual Bookshelf</h1>
            </header>

            <section className="main-content">
                {/* Conditionally render if user is not logged in */}
                {!isLoggedIn() && (
                    <>
                        <h2>Your Personal Library Awaits</h2>
                        <h2>Create an account and start making your shelf!</h2>
                    </>
                )}

                {/* Buttons Section for Login and Register */}
                {!isLoggedIn() && (
                    <section className="buttons-section">
                        <button className="button login-btn" onClick={() => navigate('/login')}>Login</button>
                        <button className="button register-btn" onClick={() => navigate('/register')}>Register</button>
                    </section>
                )}

                <div className="info-section right">
                    <div className="text">
                        <p>Explore a collection of books, keep track of ones you own and build your personal library.</p>
                    </div>
                    <div className="image">
                        <img src="/assets/images/bookshelf-1.jpg" alt="Bookshelf image" />
                    </div>
                </div>

                <div className="info-section left">
                    <div className="text">
                        <p>Recreate your physical bookshelf, add your favorites and connect with friends to find new recommendations!</p>
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