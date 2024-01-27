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
          Authorization: `Token ${token}`, // Use the correct auth header based on how your backend expects it
        },
        body: JSON.stringify({ title, text }),
      });

      if (response.ok) {
        // Handle successful question post (e.g., clear form, show success message, etc.)
        setTitle('');
        setText('');
        // You might want to fetch the questions again to update the list
        fetchQuestions();
        toggleQuestionForm();
      } else {
        // Handle error (e.g., show error message)
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
        className="bg-white rounded-lg shadow p-6 flex flex-col space-y-4 w-full max-w-md"
      >
        <h2 className="text-lg font-semibold">New Question</h2>
        <input
          type="text"
          placeholder="Enter the question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Write your question here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 h-32 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-[#6074DD] text-white py-2 rounded transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default NewQuestionForm;
