import React, { useState } from 'react';

const NewQuestionForm = ({ toggleQuestionForm, fetchQuestions }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8000/api/question/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ title, text }),
      });

      if (response.ok) {
        setTitle('');
        setText('');

        fetchQuestions();
        toggleQuestionForm();
      } else {
        console.error('Failed to post the question');
      }
    } catch (error) {
      console.error('Failed to send the request', error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <form
        onSubmit={handlePostQuestion}
        className="bg-white rounded-3xl shadow p-6 flex flex-col space-y-4 w-full max-w-md"
      >
        <h2 className="text-lg font-semibold">New Question</h2>
        <input
          type="text"
          placeholder="Enter the question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-6 py-3 border border-gray-300 text-sm"
          required
        />
        <textarea
          placeholder="Write your question here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-6 py-3 border border-gray-300 text-sm h-48"
          required
        />
        <button
          type="submit"
          className="bg-[#6074DD] text-white py-1 transition-colors w-14 rounded-full text-sm font-bold opacity-75 items-center justify-center flex mx-auto"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default NewQuestionForm;
