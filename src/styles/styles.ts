import { styled } from '@mui/system';
import backgroundImg from '../assets/background.jpg' ; // Add a suitable background image in the same directory

export const Background = styled('div')({
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Card = styled('div')({
  minWidth: 320,
  maxWidth: 400,
  padding: '2rem',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
});

export {};
