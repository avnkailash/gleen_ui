import React from 'react';

const ViewQuestions = ({ questions }) => {
  return (
    <div className="w-full md:w-3/4 mx-auto pt-4 md:pt-0">
      <h1 className="text-xl font-semibold mb-6">Questions submitted</h1>
      {questions.length > 0 ? (
        questions.map((question) => (
          <div
            key={question.id}
            className="bg-white p-4 rounded-lg shadow mb-4"
          >
            <h2 className="text-lg font-semibold mb-2">{question.title}</h2>
            <p className="text-gray-700 mb-2">{question.text}</p>
            <hr />
            <div className="flex items-center pt-6">
              <img
                src={question.user.avatar || '/user.png'}
                alt="User Icon"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm font-medium">{question.user.name}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No questions have been submitted yet.</p>
      )}
    </div>
  );
};

export default ViewQuestions;
