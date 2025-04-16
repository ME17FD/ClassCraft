// src/pages/LoginForm.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Form, Button, 
  Alert, Spinner, Image, Badge
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthService from '../services/AuthService';
//import campusIllustration from '../assets/campus-auth.svg';

const loginSchema = yup.object().shape({
  username: yup.string().required('University ID is required'),
  password: yup.string().required('Password is required')
});

function Login() {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setError('');
    setIsLoading(true);
    try {
      await AuthService.login(data.username, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="auth-container px-0">
      <Row className="g-0 min-vh-100">
        {/* Left Panel - Illustration */}
        <Col md={6} className="d-none d-md-flex bg-academic">
          <div className="d-flex flex-column justify-content-center align-items-center p-5 text-white">
            
            <h2 className="text-center mb-3">University Resource Planner</h2>
            <div className="d-flex gap-2">
              <Badge bg="light" text="dark" className="px-3 py-2">
                <i className="fas fa-calendar-check me-2"></i> Room Booking
              </Badge>
              <Badge bg="light" text="dark" className="px-3 py-2">
                <i className="fas fa-chalkboard me-2"></i> Timetable Management
              </Badge>
            </div>
          </div>
        </Col>

        {/* Right Panel - Login Form */}
        <Col md={6} className="d-flex align-items-center">
          <Container className="py-5">
            <Row className="justify-content-center">
              <Col lg={9} xl={8}>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-4 p-sm-5">
                    <div className="text-center mb-4">
                      <h3 className="fw-bold text-primary">
                        <i className="fas fa-university me-2"></i> University Login
                      </h3>
                      <p className="text-muted">Access your academic planning tools</p>
                    </div>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group className="mb-3">
                        <Form.Label>University ID</Form.Label>
                        <Form.Control
                          type="text"
                          {...register('username')}
                          isInvalid={!!errors.username}
                          placeholder="e.g. jsmith001 or P12345"
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

                      <div className="d-grid mb-3">
                        <Button 
                          variant="primary" 
                          type="submit"
                          disabled={isLoading}
                          className="py-2"
                        >
                          {isLoading ? (
                            <Spinner as="span" size="sm" animation="border" />
                          ) : (
                            <>
                              <i className="fas fa-sign-in-alt me-2"></i> Sign In
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="text-center mb-4">
                        <Link to="/forgot-password" className="text-decoration-none small">
                          Forgot your password?
                        </Link>
                      </div>

                      <hr className="my-4" />

                      <div className="text-center">
                        <p className="small text-muted mb-2">Don't have an account?</p>
                        <Link to="/signup" className="btn btn-outline-primary">
                          <i className="fas fa-user-plus me-2"></i> Request Access
                        </Link>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    © {new Date().getFullYear()} University Planning System
                  </small>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;