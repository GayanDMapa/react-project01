import React from 'react';
import { Navbar, Container, Button, Form } from 'react-bootstrap';

function CustomNavBar({ onOpen, onSearch }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand href="#">Task Manager</Navbar.Brand>
        <Form className="d-flex w-50">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => onSearch(e.target.value)}
          />
        </Form>
        <Button onClick={onOpen} variant="success">
          Add Task
        </Button>
      </Container>
    </Navbar>
  );
}

export default CustomNavBar;
