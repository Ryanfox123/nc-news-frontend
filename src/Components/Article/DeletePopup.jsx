import React from "react";
import Popup from "reactjs-popup";

function DeletePopup() {
  return (
    <Popup
      trigger={
        <button className="bg-red-400 text-white p-2 rounded-md mt-3">
          Remove your post
        </button>
      }
      modal
      closeOnDocumentClick
    >
      {(close) => (
        <div className="bg-gray-200 p-6 rounded shadow-lg flex flex-col items-center max-w-md mx-auto">
          <p className="mb-4 text-gray-800 text-center">
            Are you sure you want to delete your post? It cannot be restored
            afterward.
          </p>
          <div className="flex justify-between w-full space-x-4">
            <button
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              onClick={() => {
                close();
              }}
            >
              Remove post
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default DeletePopup;
