import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomTextField, PasswordField } from '../../components';
import { Button, Typography, CardContent, InputAdornment, Tooltip, IconButton } from '@mui/material';
import { Background, Container, Card } from '../../styles/styles';
import { post } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { Visibility, VisibilityOff, Info } from '@mui/icons-material';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const {signin} = useAuth();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const validatePassword = (password: string): boolean => {
    const minLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasLetter && hasNumber && hasSpecialChar;
  };

  const hanldeSignup = async () => {
    try {
      const response = await post('/auth/signup', { username: username, email: email, password:password });
      console.log('Response:', response.data);
      signin();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!validatePassword(password)) {
        setPasswordError('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
        return;
      }
  
      setPasswordError('');

      await hanldeSignup();

      navigate('/main');
    } catch (error) {
      console.error('Error handleSubmit data:', error);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Background>
      <Container>
        <Card style={{ backgroundColor: 'white' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">Sign-up</Typography>
            <form onSubmit={handleSubmit}>
              <CustomTextField
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <CustomTextField
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <PasswordField
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                required
                error={passwordError}
                style={{marginTop: "16px"}}
              />
              <Button style={{ marginTop: '26px' }} type="submit" variant="contained" color="primary" fullWidth>
                Sign up
              </Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
              Already have an account? <Link to="/login">Sign in</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Background>
  );
}

export default Signup;
