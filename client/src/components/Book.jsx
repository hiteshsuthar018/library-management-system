import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { createNewBook } from '../utils/api';

const Book = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    book_id: '',
    book_name: '',
    author: '',
    publication: '',
    genre: '',
    published_date: '',
  });

  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(createNewBook(formData));
      // If the book is added successfully, set the success message
      setSuccessMessage(response.payload.message);
      // Clear the form data
      setFormData({
        book_id: '',
        book_name: '',
        author: '',
        publication: '',
        genre: '',
        published_date: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
      // Handle error
    }
  };

  return (
    <>
    {successMessage && ( // Display the success message if it exists
        <Alert variant="success" className="mb-3">{successMessage}</Alert>
      )}
    <Form className='m-5' onSubmit={handleSubmit}>
      <Form.Group controlId="bookId">
        <Form.Label>Book ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter book ID"
          name="book_id"
          value={formData.book_id}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="bookName">
        <Form.Label>Book Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter book name"
          name="book_name"
          value={formData.book_name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter author name"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="publication">
        <Form.Label>Publication</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter publication"
          name="publication"
          value={formData.publication}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="genre">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="publishedDate">
        <Form.Label>Published Date</Form.Label>
        <Form.Control
          type="date"
          name="published_date"
          value={formData.published_date}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button className='m-2' variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
};

export default Book;
