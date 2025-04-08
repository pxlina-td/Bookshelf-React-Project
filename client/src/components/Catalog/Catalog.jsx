import BookList from "./BookList/BookList"
import CreateBook from "./CreateBook/CreateBook";
import { useState } from "react";

export default function Catalog() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Browse Books</h1>
      {/* Render the modal when it's open */}
      {isModalOpen && <CreateBook onClose={closeModal} />}
      <BookList /> <button 
        onClick={openModal} 
        style={{ 
          backgroundColor: '#8B0000', // Dark red color
          color: 'white', 
          padding: '15px 30px', 
          marginBottom: '20px' ,
          border: 'none', 
          borderRadius: '5px', 
        }}
      >
        Add a New Book
      </button>

    </>
  )
}
