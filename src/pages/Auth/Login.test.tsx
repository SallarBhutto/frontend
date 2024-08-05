import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { post } from '../../utils/api';

// Create a complete mock for the AuthContextType
const mockAuthContext = {
  signin: jest.fn(),
  signout: jest.fn(),
  isAuthenticated: false,
  checkAuthStatus: jest.fn(),
  checkAuth: jest.fn(),
};

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(() => mockAuthContext),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../utils/api', () => ({
  post: jest.fn(),
}));

const mockNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockPost = post as jest.MockedFunction<typeof post>;

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    mockUseAuth.mockReturnValue(mockAuthContext);
    mockNavigate.mockReturnValue(jest.fn());
    mockPost.mockResolvedValue({ status: 200, data: {} });

    render(<Login />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });
});
