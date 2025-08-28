import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }

    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/signup', { name, email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Signup successful!');
      setFormData({ name: '', email: '', password: '' });
      // Optionally redirect the user or update UI here
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', fontFamily: "'Roboto', sans-serif" }}>
      <h2>Signup</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label><br/>
        <input
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          value={name}
          onChange={onChange}
          required
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        /><br/>
        <label htmlFor="email">Email</label><br/>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          required
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        /><br/>
        <label htmlFor="password">Password</label><br/>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          required
          minLength="6"
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        /><br/>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#0077b6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('successful') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Signup;
