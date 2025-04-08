import React, { useState, useEffect } from 'react';
import './BookDetails.css';
import { getBookById } from '../../../../api/books-api';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const [book, setBook] = useState({});
  const {bookId} = useParams();

  useEffect(() => {
    (async () =>{
        const result = await getBookById(bookId);
        setBook(result);
    })();
  }, [bookId]);
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

          <p className="book-details-likes">❤️ {book.likeCount} {book.likeCount === 1 ? 'like' : 'likes'}</p>

          {/* You can add additional buttons or actions here, like "Like" or "Add to Shelf" */}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
