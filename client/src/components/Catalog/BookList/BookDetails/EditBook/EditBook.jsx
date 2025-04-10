import { useParams } from "react-router-dom";
import { useForm } from "../../../../../hooks/useForm";
import { update } from "../../../../../api/books-api";
import { useEffect } from "react";

export default function EditBook({ book, setBook, onClose }) {
    const { bookId } = useParams();

    const { 
        changeHandler,
        submitHandler,
        values,
        setValues 
    } = useForm(book, async (values) => {
        const updatedBook = await update(bookId, values);
        setBook(updatedBook);  // Immediately update the book state in the parent
        onClose();  // Close the modal after updating the book
    });

    useEffect(() => {
        setValues(book);
    }, [book]);

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Book</h2>

                <form id="edit" onSubmit={submitHandler}>
                    <label>
                        Title:
                        <input type="text" name="title" value={values.title} onChange={changeHandler} required />
                    </label>

                    <label>
                        Author:
                        <input type="text" name="author" value={values.author} onChange={changeHandler} required />
                    </label>

                    <label>
                        Description:
                        <textarea name="description" value={values.description} onChange={changeHandler} required />
                    </label>

                    <label>
                        Genre:
                        <input type="text" name="genre" value={values.genre} onChange={changeHandler} required />
                    </label>

                    <label>
                        Page count:
                        <input type="number" name="pageCount" min="1" step="1" value={values.pageCount} onChange={changeHandler} required />
                    </label>

                    <label>
                        Cover Image URL:
                        <input type="text" name="coverImage" value={values.coverImage} onChange={changeHandler} required />
                    </label>

                    <div className="modal-buttons">
                        <button type="submit">Save Changes</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
