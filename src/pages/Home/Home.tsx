import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

function Home() {
  const {logout} = useAuth();
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Welcome to the Main Page!</Typography>
      <Typography variant="body1">You have successfully signed up or logged in.</Typography>
      <Button onClick={() => logout()}>Logout</Button>
    </Container>
  );
}

export default Home;
