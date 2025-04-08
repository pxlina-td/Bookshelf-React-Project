import "./EditBook.css";

export default function EditBook(){
    
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Book</h2>

        <form id="edit" onSubmit={submitHandler}>
          <label>
            Title:
            <input type="text" name="title" value={values.title} onChange={handleChange} required />
          </label>

          <label>
            Author:
            <input type="text" name="author" value={values.author} onChange={handleChange} required />
          </label>

          <label>
            Description:
            <textarea name="description" value={values.description} onChange={handleChange} required />
          </label>

          <label>
            Genre:
            <input type="text" name="genre" value={values.genre} onChange={handleChange} required />
          </label>

          <label>
            Page count:
            <input type="number" name="pageCount" min="1" step="1" value={values.pageCount} onChange={handleChange} required />
          </label>

          <label>
            Cover Image URL:
            <input type="text" name="coverImage" value={values.coverImage} onChange={handleChange} required />
          </label>

          <div className="modal-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}