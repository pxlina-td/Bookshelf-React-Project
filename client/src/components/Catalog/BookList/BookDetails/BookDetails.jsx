import React, { useState, useEffect, useContext } from 'react';
import './BookDetails.css';
import { deleteBook, getBookById } from '../../../../api/books-api';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/authContext';

const BookDetails = () => {
  const [book, setBook] = useState({});
  const { bookId } = useParams();
  const { userId, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await getBookById(bookId);
      setBook(result);
    })();
  }, [bookId]);

  const deleteBookHandler = async() => {
    try{
     await deleteBook(bookId);
     navigate('/catalog');
    } catch(err){
      console.log(err.message);
    }
  };

  const isOwner = userId !== book._ownerId;

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

          {isAuthenticated && isOwner && (
           <div className="book-details-actions">
            <button className="edit-button" onClick={() => console.log(`Edit ${book._id}`)}>Edit</button>
            <button className="delete-button" onClick={deleteBookHandler}>Delete</button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
