import React from "react";
import { useState } from "react";
import { deleteCommentByID } from "../../../utils";

function DeleteCommentBtn({ commentID, setComments }) {
  const [isError, setIsError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsError(false);
    setIsDeleting(true);
    deleteCommentByID(commentID)
      .then(() => {
        setComments((prevComments) => {
          return prevComments.filter(
            (comment) => comment.comment_id !== commentID
          );
        });
        setIsDeleting(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsDeleting(false);
      });
  };

  return (
    <div>
      {isError && (
        <p>There was a problem deleting your comment, please try again.</p>
      )}
      <button className="bg-red-400 p-2 rounded-md mt-3" onClick={handleDelete}>
        {isDeleting ? "Deleting.." : "Delete Comment"}
      </button>
    </div>
  );
}

export default DeleteCommentBtn;
