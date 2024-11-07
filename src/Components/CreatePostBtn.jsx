import React from "react";

function CreatePostBtn({ setIsPosting }) {
  return (
    <div className="flex mb-4 h-10">
      <button
        onClick={() => {
          setIsPosting(true);
        }}
        className="bg-gray-400 hover:bg-custom-turq2 flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg transition duration-200 ease-in-out"
      >
        <p className="text-4xl text-white font-bold pb-1">+</p>
        <p className="text-white font-semibold text-lg">Create New Article</p>
      </button>
    </div>
  );
}

export default CreatePostBtn;
