import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { format } from "date-fns";
import {
  getArticleByID,
  getCommentsByID,
  patchArticleVotes,
} from "../../../utils";
import CreateComment from "./createComment";
import { UserContext } from "../../context/UserContext";
import DeletePopup from "./DeletePopup";

export default function ArticleInfo() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const { user } = useContext(UserContext);

  const handleUpvote = () => {
    if (Object.keys(user).length === 0) {
      return setCommentError("You must be logged in to vote on an article.");
    }
    const voteChange = upvote ? -1 : downvote ? 2 : 1;
    setUpvote(!upvote);
    setDownvote(false);
    setCurrArticle({ ...currArticle, votes: currArticle.votes + voteChange });

    patchArticleVotes(article_id, voteChange).catch((err) => {
      setCurrArticle({ ...currArticle, votes: currArticle.votes - voteChange });
      setCommentError("Could not update votes, try again later.");
    });
  };

  const handleDownvote = () => {
    if (Object.keys(user).length === 0) {
      return setCommentError("You must be logged in to vote on an article.");
    }
    const voteChange = downvote ? 1 : upvote ? -2 : -1;
    setDownvote(!downvote);
    setUpvote(false);
    setCurrArticle({ ...currArticle, votes: currArticle.votes + voteChange });
    patchArticleVotes(article_id, voteChange).catch((err) => {
      setCurrArticle({ ...currArticle, votes: currArticle.votes - voteChange });
      setCommentError("Could not update votes, try again later.");
    });
  };

  useEffect(() => {
    getArticleByID(article_id)
      .then((articleInfo) => {
        setCurrArticle(articleInfo);
        return getCommentsByID(article_id);
      })
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 404) {
          setError("404: Article not found.");
        } else if (err.status === 400) {
          setError("400: Invalid article request");
        }

        setLoading(false);
      });
  }, [article_id]);

  if (loading) {
    return <p className="p-20">Loading..</p>;
  }
  if (error) {
    return <p className="text-center p-10 underline">{error}</p>;
  }
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <section className="mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-row w-11/12 mb-6 space-x-6">
        <div className="flex-shrink-0 w-1/3">
          <img
            className="rounded-lg h-[300px] w-full object-cover"
            src={currArticle.article_img_url}
            alt={currArticle.title}
          />
        </div>
        <div className="flex-grow">
          <div className="flex flex-row justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {currArticle.title}
            </h2>
            <div className="flex flex-col items-center space-y-2">
              <button
                className={`font-extrabold text-5xl ${
                  upvote && Object.keys(user).length !== 0
                    ? "text-custom-turq2"
                    : "text-gray-500 hover:text-custom-turq2"
                }`}
                onClick={handleUpvote}
              >
                +
              </button>
              <button
                className={`font-extrabold text-5xl ${
                  downvote ? "text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
                onClick={handleDownvote}
              >
                -
              </button>
              {commentError && (
                <p className="text-sm text-red-600 mt-1">{commentError}</p>
              )}
            </div>
          </div>
          <p className="text-gray-600 mb-2">
            <strong>Votes:</strong> {currArticle.votes}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Topic:</strong> {currArticle.topic}
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Author: {currArticle.author}
          </h3>
          <div
            className="wysiwyg"
            dangerouslySetInnerHTML={{ __html: currArticle.body }}
          />
          <p className="text-gray-500 mb-2 italic">
            Published on:{" "}
            {currArticle.created_at
              ? format(new Date(currArticle.created_at), "MMMM d, yyyy")
              : "Unknown date"}
          </p>
          <div className="flex flex-row justify-between h-12">
            <p className="text-gray-600">
              <strong>Comments:</strong> {currArticle.comment_count}
            </p>
            {currArticle.author === user.username && <DeletePopup />}
          </div>
        </div>
      </section>

      <section className="mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col w-4/5">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
          Comments
        </h2>
        <CreateComment
          comments={comments}
          setComments={setComments}
          articleID={currArticle.article_id}
        />
        <ul className="mt-4 space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.comment_id}
              className="border-b border-gray-200 pb-4"
            >
              <CommentCard
                comment={comment}
                currArticle={currArticle}
                setComments={setComments}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
