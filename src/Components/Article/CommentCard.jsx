import React from "react";
import { format } from "date-fns";

function CommentCard({ comment }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{comment.author}</h3>
      <p className="text-gray-600 mb-2">
        <strong>Votes:</strong> {comment.votes}
      </p>
      <p>{comment.body}</p>
      <p className="text-gray-500 mb-2 italic">
        Published on: {format(new Date(comment.created_at), "MMMM d, yyyy")}
      </p>
    </div>
  );
}

export default CommentCard;
