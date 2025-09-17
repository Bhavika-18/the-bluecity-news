import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/AdminLogin.css';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  console.log('AdminLogin rendered, onLogin:', onLogin, 'Type:', typeof onLogin);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    
    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      setError('');
      localStorage.setItem('adminAuthenticated', 'true');
      console.log('Credentials correct, calling onLogin');
      
      // Check if onLogin is a function before calling it
      if (typeof onLogin === 'function') {
        onLogin(true);
      } else {
        console.error('onLogin is not a function, redirecting manually');
        // Fallback: redirect to admin page
        window.location.href = '/admin';
      }
    } else {
      setError('Invalid username or password');
      console.log('Invalid credentials');
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleInputChange}
          required
        />
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            required
            style={{ paddingRight: '3.5rem' }}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
        <button type="submit" className="btn-primary">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;