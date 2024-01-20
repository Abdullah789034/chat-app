// Home.js
import React, { useState } from 'react';
import '../CSS/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', username);
    navigate('/chat');
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="home-container"> {/* Add a unique class */}
      <h2>Log in with Username</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            minLength={6}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
