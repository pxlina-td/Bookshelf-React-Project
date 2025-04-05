import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onClick }) => {
  return (
    <div className="book-card" onClick={() => onClick(book)}>
      <img src={book.coverImage} alt={book.title} className="book-cover" />
      <div className="book-title">{book.title}</div>
      <div className="book-author">{book.author}</div>
    </div>
  );
};

export default BookCard;