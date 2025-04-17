// src/pages/DashboardPage.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {user && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Welcome, {user.firstName} {user.lastName}!</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Role: {user.roles?.join(', ')}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default DashboardPage;