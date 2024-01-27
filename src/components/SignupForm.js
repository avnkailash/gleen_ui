import React, { useState } from 'react';

const SignupForm = ({ setShowLoginForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (password !== confirmPassword) {
        setError('Password does not match');
        return;
      }

      let formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('name', name);
      if (avatar) {
        formData.append('avatar', avatar);
      }

      const response = await fetch('http://localhost:8000/api/profile/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowLoginForm(true);
      } else {
        setError('There is an error. Please try again.');
      }
    } catch (error) {
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-full max-w-md"
    >
      <h1 className="text-xl font-bold mb-6">Signup</h1>
      <div className="w-full mb-4">
        <div className="w-full mb-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
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
      <div className="w-full mb-6">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setconfirmPassword(e.target.value);
          }}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="w-full mb-6">
        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <button
        type="submit"
        className="bg-[#6074DD] text-white font-semibold text-sm px-6 py-3 w-64 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#6074DD] hover:opacity-80 transition-color"
        disabled={password !== confirmPassword}
      >
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
