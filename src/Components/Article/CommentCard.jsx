import { format } from "date-fns";
import DeleteCommentBtn from "./DeleteCommentBtn";

import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

function CommentCard({ comment, setComments }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-semibold mb-2">{comment.author}</h3>
        {user.username === comment.author ? (
          <DeleteCommentBtn
            commentID={comment.comment_id}
            setComments={setComments}
          />
        ) : null}
      </div>
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
