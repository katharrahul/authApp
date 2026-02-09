// Login.js - Login form component

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login({ auth, setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(''); // clear previous error

  try {
    await signInWithEmailAndPassword(auth, email, password);
    setIsAuthenticated(true);
    navigate('/dashboard');
  } catch (err) {
    console.error("Login error:", err.code, err.message);

    let msg = 'Invalid email or password. Please try again.';
    
    if (err.code === 'auth/invalid-credential') {
      msg = 'Invalid credentials – check spelling or register first.';
    } else if (err.code === 'auth/user-disabled') {
      msg = 'This account has been disabled.';
    } else if (err.code === 'auth/too-many-requests') {
      msg = 'Too many attempts. Try again later.';
    }

    setError(msg);
  }
};
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
}

export default Login;