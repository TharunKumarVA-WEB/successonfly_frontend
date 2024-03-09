

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ setLoggedIn, setUserEmail }) {
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log('Logging in user...');

      // Simulating login, replace this with actual login logic
      const userEmail = loginFormData.username; // Assume username is the email
      setLoggedIn(true);
      setUserEmail(userEmail);
      navigate('/');

      console.log('Login successful.');
    } catch (error) {
      console.error('Unexpected error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email..."
              value={loginFormData.username}
              onChange={(e) => setLoginFormData({ ...loginFormData, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password..."
              value={loginFormData.password}
              onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignIn;


