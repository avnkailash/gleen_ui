import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewQuestionForm from './components/NewQuestionForm';
import ViewQuestions from './components/ViewQuestions';
import Pusher from 'pusher-js';

const Dashboard = () => {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    var pusher = new Pusher('b57ac495b11384ef6852', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {
      const newQuestion = JSON.parse(data['question']);
      newQuestion['user']['avatar'] =
        'http://localhost:8000' + newQuestion['user']['avatar'];

      console.log(newQuestion);

      setQuestions((prevQuestions) => {
        const exists = prevQuestions.filter((q) => q.id === newQuestion.id);
        if (exists.length > 0) return prevQuestions;
        else return [newQuestion, ...prevQuestions];
      });
    });
  }, []);

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
    <div className="w-full h-screen flex flex-col bg-[#e9e9e9] px-4 md:px-16 py-6 min-h-screen font-poppins overflow-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row w-full items-center space-y-4 md:space-x-4 md:space-y-0 justify-between text-xl">
        <p className="text-[#6074DD] text-xl font-bold flex items-center justify-center">
          <img
            src={localStorage.getItem('avatar') || '/user.png'}
            alt="User Icon"
            className="w-6 h-6 md:w-12 md:h-12 rounded-full mr-2"
          />
          {localStorage.getItem('name')}
        </p>

        <div className="flex flex-col md:flex-row w-fit space-y-4 md:space-x-4 md:space-y-0 items-center justify-center">
          <button
            onClick={toggleQuestionForm}
            className="px-4 py-2 bg-[#6074DD] text-white rounded-full transition-colors w-36 text-sm"
          >
            {showQuestionForm ? 'View Questions' : 'Ask a question'}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors w-36 text-sm"
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
