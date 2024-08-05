import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { post } from '../../utils/api';

function Home() {
  const {signout} = useAuth();
  
  const handleSignout = async () => {
    try {
      signout();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Welcome to the Main Page!</Typography>
      <Typography variant="body1">You have successfully signed up or logged in.</Typography>
      <Button onClick={handleSignout}>Logout</Button>
    </Container>
  );
}

export default Home;
