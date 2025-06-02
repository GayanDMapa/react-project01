import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  // Handles login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      // Send POST request to login endpoint
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // Save token (for example purposes)
      localStorage.setItem('token', response.data.token);
      setMsg('Login successful!');

      // Redirect user after login
      navigate('/tasks');
    } catch (error) {
      // Show error message from server or generic
      const errMsg = error.response?.data?.message || 'Login failed';
      setMsg(errMsg);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="login-card shadow-lg">
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="text-primary">Welcome</h2>
            <p className="text-muted">Please login to your account</p>
          </div>

          {msg && <div className="alert alert-info">{msg}</div>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <a href="/forgot-password" className="text-decoration-none">Forgot password?</a>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 mb-3"
            >
              Login
            </Button>

            <div className="text-center mb-3 position-relative">
              <hr />
              <span
                className="position-absolute bg-white px-2"
                style={{ top: '-10px', left: '50%', transform: 'translateX(-50%)' }}
              >
                OR
              </span>
            </div>

            <div className="text-center">
              <p className="mb-0">
                Don't have an account? <a href="/signup" className="text-decoration-none">Sign Up</a>
              </p>
            </div>
          </Form>

          {/* Back to Home button */}
          <Button
            variant="secondary"
            className="w-100 mt-3"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;
