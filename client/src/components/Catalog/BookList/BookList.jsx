import React, { useState, useEffect } from 'react';
import './BookList.css';
import { getAllBooks } from '../../../api/books-api';
import BookCard from './BookCard/BookCard';
import Pagination from '../../Pagination';
import { useNavigate } from 'react-router-dom'; // Import navigate hook

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const booksPerPage = 16;
  const navigate = useNavigate(); // Set up navigate

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getAllBooks();

        if (data) {
          const booksArray = Object.values(data);
          const totalBooks = booksArray.length;
          setTotalPages(Math.ceil(totalBooks / booksPerPage));

          const startIndex = (currentPage - 1) * booksPerPage;
          const currentBooks = booksArray.slice(startIndex, startIndex + booksPerPage);
          setBooks(currentBooks);
        } else {
          setError('Failed to load books.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBookClick = (book) => {
    navigate(`/catalog/${book._id}`); // Navigate to the book details page
  };

  return (
    <div className="book-list-container">
      {error && <div className="error">{error}</div>}

      {loading ? (
        <div>Loading books...</div>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book._id} book={book} onClick={handleBookClick} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookList;
