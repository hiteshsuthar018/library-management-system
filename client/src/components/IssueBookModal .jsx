import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { issueBook } from '../utils/api';

const IssueBookModal = ({ show, handleClose, studentId }) => {
  const dispatch = useDispatch();
  const [bookId, setBookId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(issueBook({ studentId, bookId }));
  };

  const { loading, error, successMessage } = useSelector((state) => state.issueBook);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Issue Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBookId">
            <Form.Label>Book ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
          </Form.Group>
          <Button className='my-2' variant="success" type="submit" disabled={loading}>
            {loading ? 'Issuing...' : 'Submit'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IssueBookModal;
