import React from 'react';
import { Navbar, Container, Button, Form, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function CustomNavBar({ onOpen, onSearch }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, session, etc.)
    console.log('Logging out...');
    
    // Example: Clear user session and redirect
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          Task Manager
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" className="custom-toggler" />
        
        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          <Nav className="ms-3 me-auto">
            <Nav.Link as={Link} to="/tasks" className="nav-link-custom">
              <i className="bi bi-list-task me-1"></i>
              Tasks
            </Nav.Link>
          </Nav>
          
          <div className="d-flex align-items-center nav-right-section">
            <Form className="search-form me-3">
              <div className="input-group">
                <span className="input-group-text bg-white border-white">
                  <i className="bi bi-search text-dark"></i>
                </span>
                <Form.Control
                  type="search"
                  placeholder="Search tasks..."
                  className="search-input border-white bg-white text-dark"
                  aria-label="Search"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </Form>
            
            <Button 
              onClick={onOpen} 
              variant="success" 
              className="add-task-btn me-3"
            >
              <i className="bi bi-plus-circle me-1"></i>
              Add Task
            </Button>
            
            {/* Improved Logout Button with Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle 
                variant="outline-light" 
                id="dropdown-user" 
                className="logout-toggle"
              >
                <i className="bi bi-person-circle me-1"></i>
                User
              </Dropdown.Toggle>
              
              <Dropdown.Menu className="dropdown-menu-dark">
                <Dropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person me-2"></i>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }} 
                  className="text-danger"
                  as="button"
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavBar;