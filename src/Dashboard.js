import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewQuestionForm from './components/NewQuestionForm';
import ViewQuestions from './components/ViewQuestions';

const Dashboard = () => {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const toggleQuestionForm = () => {
    setShowQuestionForm((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/api/question/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Could not fetch questions');
      }

      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#e9e9e9] px-16 py-4">
      {/* Header */}
      <div className="flex flex-row w-full items-center space-x-4 justify-between">
        <p className="text-[#6074DD] text-base font-bold flex">
          <img
            src={localStorage.getItem('avatar') || '/user.png'}
            alt="User Icon"
            className="w-6 h-6 rounded-full mr-2"
          />
          {localStorage.getItem('name')}
        </p>

        <div className="flex flex-row w-fit space-x-4">
          {/* Logout Button */}
          <button
            onClick={toggleQuestionForm}
            className="mt-4 px-4 py-2 bg-[#6074DD] text-white rounded-full transition-colors w-40"
          >
            {showQuestionForm ? 'View Questions' : 'Post Question'}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Question Form */}
      {showQuestionForm ? (
        <NewQuestionForm
          toggleQuestionForm={toggleQuestionForm}
          fetchQuestions={fetchQuestions}
        />
      ) : (
        <ViewQuestions questions={questions} />
      )}
    </div>
  );
};

export default Dashboard;
