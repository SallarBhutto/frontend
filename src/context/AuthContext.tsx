import axios from 'axios';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { post } from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  signin: () => void;
  signout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await post('/auth/check', {}, { withCredentials: true });
      if (response.status === 200) {
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };
  
  const signout = async () => {
    try {
      await post('/auth/signout', {}, { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const signin = () => setIsAuthenticated(true);

  useEffect(() => {
    checkAuth(); // Ensure this is only called on mount
  }, []);

  // Redirect based on authentication status
  useEffect(() => {
    console.log("useEffect auth, ", isAuthenticated);
    if (isAuthenticated) {
      navigate('/main');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated]);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, signin, signout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
