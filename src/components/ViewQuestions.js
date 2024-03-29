import React from 'react';

const ViewQuestions = ({ questions }) => {
  return (
    <div className="w-full md:w-5/6 mx-auto pt-4 md:pt-2">
      <h1 className="text-xl font-semibold mb-6 mx-auto text-center">
        Questions submitted
      </h1>
      <div className="flex flex-col space-y-6">
        {questions.length > 0 ? (
          questions.map((question) => {
            console.log(question);
            return (
              <div key={question.id} className="bg-white p-4 rounded-3xl mb-4">
                <h2 className="text-lg font-semibold mb-2 leading-6">
                  {question.title}
                </h2>
                <p className="text-gray-700 mb-2 font-medium">
                  {question.text}
                </p>
                <hr className="my-5" />
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-bold">Asked by:</p>
                  <div className="flex items-center space-x-2">
                    <img
                      src={question?.user?.avatar || '/user.png'}
                      alt="User Icon"
                      className="w-12 h-12 rounded-full mr-2"
                    />
                    <span className="text-sm font-bold text-[#6074DD]">
                      {question?.user?.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No questions have been submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewQuestions;
