import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomTextField } from '../../components';
import { Button, Typography, CardContent } from '@mui/material';
import { Background, Container, Card } from '../../styles/styles';
import { useAuth } from '../../context/AuthContext';
import { post } from '../../utils/api';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const {signin, isAuthenticated} = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const hanldeSignin = async () => {
    try {
      const response = await post('/auth/signin', { email: email, password: password});
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement signup logic here
    await hanldeSignin();
    signin()
    navigate('/main');
  };

  useEffect(() => {
    if(isAuthenticated){
      navigate("/main")
    }
  }, [])
  

  return (
    <Background>
      <Container>
        <Card style={{backgroundColor: "white"}}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">Sign-in</Typography>
            <form onSubmit={handleSubmit}>
              <CustomTextField
                label="Email"
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
              <CustomTextField
                label="Password"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
              <Button style={{marginTop: "16px"}} type="submit" variant="contained" color="primary" fullWidth>Sign in</Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: "16px" }}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Background>
  );
}

export default Login;
