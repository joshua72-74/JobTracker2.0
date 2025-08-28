import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '6rem 2rem',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '5rem auto',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h1 style={{ color: '#0077b6', fontSize: '3rem', marginBottom: '1rem' }}>
        Welcome to JobTracker 2.0
      </h1>
      <p
        style={{
          fontSize: '1.3rem',
          color: '#37474f',
          lineHeight: '1.6',
          marginBottom: '2rem',
        }}
      >
        Organize and track your job applications seamlessly.
        <br />
        Stay on top of your job search with status updates, notes, and
        reminders.
      </p>

      {/* Signup Button */}
      <button
        style={{
          backgroundColor: '#0077b6',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '15px 40px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 119, 182, 0.4)',
          margin: '0 10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={() => (window.location.href = '/signup')}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#005f8a')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#0077b6')}
      >
        Get Started
      </button>

      {/* Learn More Button */}
      <button
        style={{
          backgroundColor: '#e0e0e0',
          color: '#263238',
          border: 'none',
          borderRadius: '8px',
          padding: '15px 40px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          margin: '0 10px',
          transition: 'background-color 0.3s ease',
        }}
        onClick={() => (window.location.href = '/about')}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#bdbdbd')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
      >
        Learn More
      </button>
    </div>
  );
};

export default Home;
