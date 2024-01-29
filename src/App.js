import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#e9e9e9] space-y-4 font-poppins">
      {showLoginForm ? (
        <LoginForm />
      ) : (
        <SignupForm setShowLoginForm={setShowLoginForm} />
      )}

      <p className="text-gray-500">
        {showLoginForm ? "Don't have an account?" : 'Already have an account?'}
        <button
          onClick={() => setShowLoginForm(!showLoginForm)}
          className="text-[#6074DD] ml-1"
        >
          {showLoginForm ? 'Signup' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default App;
