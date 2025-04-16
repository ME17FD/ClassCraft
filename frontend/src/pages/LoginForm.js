// src/pages/LoginForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, 
  Card, 
  Form, 
  Button, 
  Alert, 
  Spinner,
  Row,
  Col,
  Image 
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthService from '../services/AuthService';
import classcraftLogo from '../assets/classcraft-logo.png'; // Add your logo

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate('/home');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      await AuthService.login(data.username, data.password);
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center bg-light">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <Image 
                  src={classcraftLogo} 
                  alt="ClassCraft Logo" 
                  height="60"
                  className="mb-3"
                />
                <h2 className="text-primary">Welcome Back</h2>
                <p className="text-muted">Please sign in to continue</p>
              </div>

              {errorMessage && (
                <Alert variant="danger" className="text-center">
                  {errorMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('username')}
                    isInvalid={!!errors.username}
                    placeholder="Enter your username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                    placeholder="Enter your password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3 py-2 fw-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner as="span" animation="border" size="sm" role="status" />
                  ) : 'Sign In'}
                </Button>

                <div className="text-center mb-3">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </div>

                <div className="text-center">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to="/signup" className="text-decoration-none fw-bold">
                    Sign Up
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;