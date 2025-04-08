import { useNavigate } from "react-router-dom";
import { useCreateBook } from "../../../hooks/useBooks";
import { useForm } from "../../../hooks/useForm";
import { useState } from "react";
import "./CreateBook.css";

const initialValues = {
    title: '',
    author: '',
    description: '',
    genre: '',
    pageCount: '',
    coverImage: ''
};

export default function CreateBook({ onClose }) {
    const createBook = useCreateBook();
    const navigate = useNavigate();
    const [error, setError] = useState(null); 

    const createHandler = async (values) => {
        try {
            setError(null); // Clear any previous errors
            const { _id: bookId } = await createBook(values);
            navigate(`/catalog/${bookId}`);
        } catch (err) {
            setError(err.message || "Something went wrong while creating the book.");
        }
    };

    const {
        values,
        changeHandler,
        submitHandler
    } = useForm(initialValues, createHandler);

    // Optional: clear error on input change
    const handleChange = (e) => {
        if (error) setError(null);
        changeHandler(e);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add a New Book</h2>

                {error && <div className="error-message">{error}</div>} {/* 👈 error display */}

                <form id="create" onSubmit={submitHandler}>
                    <label>
                        Title:
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            required />
                    </label>

                    <label>
                        Author:
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={values.author}
                            onChange={handleChange}
                            required />
                    </label>

                    <label>
                        Description:
                        <textarea
                            id="description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            required />
                    </label>

                    <label>
                        Genre:
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            placeholder="Adventure, Science Fiction ..."
                            value={values.genre}
                            onChange={handleChange}
                            required />
                    </label>

                    <label>
                        Page count:
                        <input
                            type="number"
                            id="pageCount"
                            name="pageCount"
                            min="1"
                            step="1"
                            value={values.pageCount}
                            onChange={handleChange}
                            required />
                    </label>

                    <label>
                        Cover Image URL:
                        <input
                            type="text"
                            id="coverImage"
                            name="coverImage"
                            value={values.coverImage}
                            onChange={handleChange}
                            required />
                    </label>

                    <div className="modal-buttons">
                        <button type="submit">Create</button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
