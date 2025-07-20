import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import './SignupPage.css';  // Optional: your custom styles

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password
      });

      setMsg(response.data.message || 'Signup successful! Please check your email to verify.');
      setLoading(false);
      
      // Optionally redirect to login after delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Signup failed. Please try again.';
      setMsg(errMsg);
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="signup-card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="text-primary">Create Account</h2>
            <p className="text-muted">Please fill in the form to register</p>
          </div>

          {msg && <div className="alert alert-info">{msg}</div>}

          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="signupName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignupPage;
