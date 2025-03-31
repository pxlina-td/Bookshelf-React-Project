import React from 'react';
import '../../assets/style.css';  

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Welcome to the Virtual Bookshelf!</h1>
      </header>

      <section className="main-content">
        <h2>Your Personal Library Awaits!</h2>

        <div className="info-section right">
          <div className="text">
            <p>Explore a collection of books, keep track of books you own, and build your personal library.</p>
          </div>
          <div className="image">
            <img src="/assets/images/library.png" alt="Bookshelf icon" />
          </div>
        </div>

        <div className="info-section left">
          <div className="image">
            <img src="/assets/images/favorites.png" alt="Favorites icon" />
          </div>
          <div className="text">
            <p>Recreate your physical bookshelf, add your favorites, and connect with friends to find new recommendations!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;