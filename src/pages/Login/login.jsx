import React, { useState } from 'react';
import styles from './Login.module.css'; 
import neuroStackImage from '../../Components/Assests/NeuroStack.jpg';

function LoginOptions() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter a username and password');
      return;
    }
    try {
      const response = await fetch('your_backend_login_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Login successful
        alert('Login successful!');
      } else {
        // Login failed
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.loginOptions}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <label htmlFor="username">Username:</label><br />
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        /><br />
        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        /><br />
        <input type="submit" value="Login" className={styles.submit} />
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.photo}>
      <img src={neuroStackImage} alt="Logo" />
      </div>
      <LoginOptions />
    </div>
  );
}

export default LoginPage;
