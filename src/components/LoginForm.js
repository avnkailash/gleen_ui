import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/profile/me/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const profileData = await response.json();
        localStorage.setItem('email', profileData.email);
        localStorage.setItem('name', profileData.name);
        localStorage.setItem('avatar', profileData.avatar);
      } else {
        console.error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Failed to fetch profile data', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem('token', data.token);

        await fetchUserProfile(data.token);

        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (error) {
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-full max-w-md"
    >
      <h1 className="text-xl font-bold mb-6">Login</h1>
      <div className="w-full mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="w-full mb-6">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <button
        type="submit"
        className="bg-[#6074DD] text-white font-semibold text-sm px-6 py-3 w-64 rounded-full transition-colors"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
