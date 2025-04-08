import React from 'react';
import './DeleteBook.css';

export default function DeleteBook({ onConfirm, onCancel }) {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h3>Are you sure you want to delete this book?</h3>
        <p>This action cannot be undone.</p>
        <div className="delete-buttons">
          <button className="confirm-delete" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="cancel-delete" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}