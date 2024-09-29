import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useAuth } from './components/useAuth';
import Footer from './components/Footer';

const App: React.FC = () => {
  document.title = "CV easy";

  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated ? (
        <>
          <Dashboard />
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
