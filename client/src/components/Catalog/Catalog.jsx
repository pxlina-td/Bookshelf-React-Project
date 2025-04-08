import BookList from "./BookList/BookList"
import CreateBook from "./CreateBook/CreateBook";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export default function Catalog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Browse Books</h1>
      {isAuthenticated && isModalOpen && <CreateBook onClose={closeModal} />}
      <BookList />
      {isAuthenticated && (
        <button
          onClick={openModal}
          style={{
            backgroundColor: '#8B0000',
            color: 'white',
            padding: '15px 30px',
            marginBottom: '20px',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Add a New Book
        </button>
      )}
    </>
  )
}
