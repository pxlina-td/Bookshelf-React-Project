import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookList.css';
import { getAllBooks } from '../../../api/books-api'; // Import the books API
import BookCard from './BookCard/BookCard'; // Your book card component
import Pagination from '../../Pagination'; // Import the Pagination component

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const booksPerPage = 20; // Set how many books you want per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getAllBooks(); // Fetch books from your API

        if (data) {
          const booksArray = Object.values(data); // Assuming API response is { book1: {...}, book2: {...} }
          const totalBooks = booksArray.length;
          setTotalPages(Math.ceil(totalBooks / booksPerPage)); // Calculate total pages

          // Paginate the books
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
  }, [currentPage]); // Fetch books again when the currentPage changes

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update the current page
  };

  return (
    <div className="book-list-container">
      {error && <div className="error">{error}</div>} {/* Display any error */}

      {loading ? (
        <div>Loading books...</div> // Show loading state
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book._id} book={book} /> // Pass each book to BookCard
          ))}
        </div>
      )}

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} // Pass the page change handler to Pagination
      />
    </div>
  );
};

export default BookList;