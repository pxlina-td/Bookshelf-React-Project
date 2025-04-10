import React, { useState, useEffect } from 'react';
import './BookDetails.css';
import EditBook from './EditBook/EditBook';
import { deleteBook, getBookById } from '../../../../api/books-api';
import { getMe, updateUser } from '../../../../api/auth-api';
import { useNavigate, useParams } from 'react-router-dom';

const BookDetails = () => {
  const [book, setBook] = useState({});
  const [inShelf, setInShelf] = useState(false);
  const [userId, setUserId] = useState(null);  // State to hold the userId
  const { bookId } = useParams();
  console.log('Book ID:', bookId);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch book data
    const fetchBookData = async () => {
      try {
        const result = await getBookById(bookId);
        setBook(result);
      } catch (err) {
        console.error('Error fetching book data:', err.message);
      }
    };

    // Fetch user data only if authenticated
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const userData = await getMe();
          setUserId(userData._id);  // Set the userId
          const alreadyInShelf = userData.shelf?.some(item => item.bookId === bookId);
          setInShelf(alreadyInShelf);  // Check if the book is in the shelf
        } catch (err) {
          console.error('Failed to fetch user data:', err.message);
        }
      }
    };

    fetchBookData();
    fetchUserData();
  }, [bookId]);

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
      const userData = await getMe(); // Always get fresh data
  
      let updatedShelf;
  
      if (inShelf) {
        // Remove the book object
        updatedShelf = userData.shelf.filter(item => item.bookId !== bookId);
      } else {
        // Add the book as an object
        updatedShelf = [...(userData.shelf || []), { bookId }];
      }
  
      const updatedUser = await updateUser({ shelf: updatedShelf });
  
      // Use same object-based comparison
      const alreadyInShelf = updatedUser.shelf?.some(item => item.bookId === bookId);
      setInShelf(alreadyInShelf);
    } catch (err) {
      console.log('Error updating shelf:', err.message);
    }
  };

  // Check if the current user is the owner of the book
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

          {/* Show Edit and Delete buttons if the user is the owner */}
          {isOwner && (
            <div className="book-details-actions">
              <button className="edit-button" onClick={() => setShowEditModal(true)}>Edit</button>
              <button className="delete-button" onClick={deleteBookHandler}>Delete</button>
            </div>
          )}

          {/* Show Add/Remove to Shelf button if the user is authenticated */}
          {userId && (
            <div className="book-details-actions">
              <button className={`toggle-shelf-button ${inShelf ? 'remove' : 'add'}`} onClick={toggleShelfHandler}>
                {inShelf ? '- Remove from Shelf' : '+ Add to Shelf'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Show EditBook modal if showEditModal is true */}
      {showEditModal && <EditBook book={book} setBook={setBook} onClose={() => setShowEditModal(false)} />}
    </div>
  );
};

export default BookDetails;
