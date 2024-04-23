import React from "react";

const NewPostButton = ({ onClick }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
      <button onClick={onClick} className="text-indigo-600 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <p className="mt-2 text-gray-600">Create New Post</p>
      </button>
    </div>
  );
};

export default NewPostButton;
