import React, { useState, useEffect, useContext } from 'react';
import './BookDetails.css';
import EditBook from './EditBook/EditBook';
import { deleteBook, getBookById } from '../../../../api/books-api';
import { addToShelf, removeFromShelf } from '../../../../api/books-api';
import { getMe } from '../../../../api/auth-api';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/authContext';

const BookDetails = () => {
  const [book, setBook] = useState({});
  const [inShelf, setInShelf] = useState(false);
  const { bookId } = useParams();
  const { userId, isAuthenticated } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await getBookById(bookId);
      setBook(result);

      if (isAuthenticated) {
        try {
          const userData = await getMe(); 
          const alreadyInShelf = userData.shelf?.some(item => item.bookId === bookId);
          setInShelf(alreadyInShelf);
        } catch (err) {
          console.error('Failed to fetch user data:', err.message);
        }
      }
    })();
  }, [bookId, isAuthenticated]);

  const deleteBookHandler = async () => {
    try {
      await deleteBook(bookId);
      navigate('/catalog');
    } catch (err) {
      console.log(err.message);
    }
  };

  const toggleShelfHandler = async () => {
    try {
      if (inShelf) {
        removeFromShelf(userId, bookId);
      } else {
        addToShelf(userId, bookId);
      }
      setInShelf(!inShelf);
    } catch (err) {
      console.log(err.message);
    }
  };

  const isOwner = userId === book._ownerId;

  return (
    <div className="book-details-page">
      <div className="book-details-content">
        <img className="book-details-cover" src={book.coverImage} alt={book.title} />

        <div className="book-details-info">
          <h2 className="book-details-title">{book.title}</h2>
          <p className="book-details-author">by {book.author}</p>

          <p className="book-details-genre"><strong>Genre:</strong> {book.genre}</p>
          <p className="book-details-pages"><strong>Pages:</strong> {book.pageCount}</p>

          <p className="book-details-description">{book.description}</p>

          {!isOwner && (
            <div className="book-details-actions">
              <button className="edit-button" onClick={() => setShowEditModal(true)}>Edit</button>
              <button className="delete-button" onClick={deleteBookHandler}>Delete</button>
            </div>
          )}

          {isAuthenticated && (
            <div className="book-details-actions">
              <button className="toggle-shelf-button" onClick={toggleShelfHandler}>
                {inShelf ? 'Remove from Shelf' : 'Add to Shelf'}
              </button>
            </div>
          )}
        </div>
      </div>
      {showEditModal && <EditBook onClose={() => setShowEditModal(false)} />}
    </div>
  );
};

export default BookDetails;
