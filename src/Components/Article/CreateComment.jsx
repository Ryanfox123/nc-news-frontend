import React, { useState } from "react";
import { postCommentByID } from "../../../utils";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function CreateComment({ articleID, comments, setComments }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const { user } = useContext(UserContext);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleCancelComment = () => {
    setIsCommenting(false);
    setComment("");
  };

  const handleSubmit = () => {
    setIsError(false);
    setIsPosting(true);
    if (comment.length === 0) {
      setIsPosting(false);
      return setIsError(true);
    }
    postCommentByID(articleID, comment, user.username)
      .then((res) => {
        setComments([res, ...comments]);
        setComment("");
        setIsCommenting(false);
        setIsPosting(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsPosting(false);
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center">
      {Object.keys(user).length === 0 ? (
        <p>
          Please{" "}
          <span className="underline">
            {" "}
            <Link to="/login">log in </Link>
          </span>
          to post a comment.
        </p>
      ) : isCommenting ? (
        <div className="p-6 bg-gray-50 shadow-lg rounded-lg flex flex-col w-full mb-5 mt-10">
          {isPosting && (
            <p className="mb-3 text-blue-600 font-semibold">
              Your comment is being posted...
            </p>
          )}
          {isError && (
            <p className="text-red-500 font-semibold">
              There was an error posting your comment, please try again later.
            </p>
          )}
          <label
            htmlFor="create-comment"
            className="text-gray-700 font-semibold mb-2"
          >
            Write your comment here:
          </label>
          <textarea
            id="create-comment"
            name="create-comment"
            className="bg-white border border-gray-300 rounded-md resize-none p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={comment}
            onChange={handleComment}
            rows="4"
          ></textarea>
          <div className="flex flex-row justify-between mt-5 space-x-2">
            <button
              onClick={handleCancelComment}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-md px-4 py-2 transition duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-2 transition duration-200 ease-in-out"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-custom-turq hover:bg-custom-turq2 text-gray- font-semibold rounded-md px-4 py-2 transition duration-200 ease-in-out mt-4 mb-3"
          onClick={() => {
            setIsCommenting(true);
          }}
        >
          Post a new comment
        </button>
      )}
    </div>
  );
}

export default CreateComment;
