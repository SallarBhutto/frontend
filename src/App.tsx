import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Signup, Login, Home } from './pages';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/main" /> : <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
              } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            <Route path="/main" element={
              <PrivateRoute>
                  <Home />
              </PrivateRoute>
              } />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
