import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container fluid className="homepage-background">
      <div className="hero-content text-center">
        <h1 className="display-3 fw-bold mb-4 text-white">TaskMaster Pro</h1>
        <p className="lead mb-5 text-light">Your ultimate productivity companion</p>
        <div className="d-flex justify-content-center gap-3">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/login')}
            className="px-4 py-2"
          >
            Login
          </Button>
          <Button 
            variant="outline-light" 
            size="lg" 
            onClick={() => navigate('/features')}
            className="px-4 py-2"
          >
            Learn More
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
