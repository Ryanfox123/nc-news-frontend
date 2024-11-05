import React, { useState } from "react";
import { postCommentByID } from "../../../utils";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

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
    setIsPosting(true);
    postCommentByID(articleID, comment, user.username)
      .then((res) => {
        setComments([...comments, res]);
        setComment("");
        setIsCommenting(false);
        setIsPosting(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsPosting(false);
      });
  };

  return (
    <div className="mx-auto p-4 shadow-md rounded-lg flex flex-col w-4/5 ">
      {isCommenting ? (
        <div className="mx-auto p-4 bg-gray-100 shadow-md rounded-lg flex flex-col w-4/5 mb-40 mt-10">
          {isPosting && <p className="mb-3">Your comment is being posted..</p>}
          {isError && (
            <p>
              There was an error posting your comment, please try again later.
            </p>
          )}
          <label htmlFor="create-comment">Write your comment here:</label>
          <textarea
            id="create-comment"
            name="create-comment"
            className="bg-white rounded-sm size-auto p-2"
            value={comment}
            onChange={handleComment}
          ></textarea>
          <div className="flex flex-row justify-between mt-5">
            <button onClick={handleCancelComment}>Cancel comment</button>
            <button
              onClick={handleSubmit}
              className="bg-slate-200 rounded-md p-2"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-slate-200 rounded-md p-2"
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
