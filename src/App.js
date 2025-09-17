import React from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import CategoryPage from './pages/Category';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';
import LogIn from './pages/AdminLogin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } 
      />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default App;