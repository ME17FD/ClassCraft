// src/pages/SignupForm.js
import React, { useState } from 'react';
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

const signupSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .max(50, 'Email must not exceed 50 characters'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  role: yup.string()
    .required('Role is required')
    .oneOf(['ROLE_STUDENT', 'ROLE_PROFESSOR', 'ROLE_ADMIN'], 'Invalid role')
});

function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      role: 'ROLE_STUDENT'
    }
  });

  const onSubmit = async (data) => {
    setErrorMessage('');
    
    try {
      await AuthService.signup(
        data.username,
        data.email,
        data.password,
        data.role
      );
      navigate('/login');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                      (error.response?.data?.errors 
                        ? Object.values(error.response.data.errors).join(' ') 
                        : 'Registration failed. Please try again.');
      setErrorMessage(errorMsg);
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
                <h2 className="text-primary">Create Account</h2>
                <p className="text-muted">Join ClassCraft today</p>
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
                    placeholder="Choose a username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register('email')}
                    isInvalid={!!errors.email}
                    placeholder="Enter your email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                    placeholder="Create a password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    {...register('role')}
                    isInvalid={!!errors.role}
                  >
                    <option value="ROLE_STUDENT">Student</option>
                    <option value="ROLE_PROFESSOR">Professor</option>
                    <option value="ROLE_ADMIN">Admin</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.role?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3 py-2 fw-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner as="span" animation="border" size="sm" role="status" />
                  ) : 'Create Account'}
                </Button>

                <div className="text-center">
                  <span className="text-muted">Already have an account? </span>
                  <Link to="/login" className="text-decoration-none fw-bold">
                    Sign In
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

export default Signup;