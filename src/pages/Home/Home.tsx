import React from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

function Home() {
  const { signout } = useAuth();
  
  const handleSignout = async () => {
    try {
      signout();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            textAlign: 'center',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to the Main Page!
          </Typography>
          <Typography variant="body1" paragraph>
            This is the task for easygenerator.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Home;
