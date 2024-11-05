import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { format } from "date-fns";
import {
  getArticleByID,
  getCommentsByID,
  patchArticleVotes,
} from "../../../utils";
import CreateComment from "./createComment";

export default function ArticleInfo() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const handleUpvote = () => {
    //votechange will be 1 if neither buttons are toggle, 2 if downvote is already toggled or -1 if i untoggle upvote. this is then passed into my api for patch method.
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
        setError("Failed to load article data.");
        setLoading(false);
      });
  }, [article_id]);

  if (loading) {
    return <p>Loading..</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <section className="mx-auto p-4 bg-white shadow-md rounded-lg flex flex-row w-4/5">
        <div>
          <img
            className="rounded-lg mb-4 h-[300px] w-full p-2"
            src={currArticle.article_img_url}
            alt={currArticle.title}
          />
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold mb-2">{currArticle.title}</h2>
            <div className="flex flex-col w-max">
              <button
                className={`font-extrabold text-5xl ${
                  upvote ? "text-red-500" : ""
                }`}
                onClick={handleUpvote}
              >
                +
              </button>
              <button
                className={`font-extrabold text-5xl ${
                  downvote ? "text-blue-500" : ""
                }`}
                onClick={handleDownvote}
              >
                -
              </button>
              {commentError ? <p>{commentError}</p> : null}
            </div>
          </div>
          <p className="text-gray-600 mb-2">
            <strong>Votes:</strong> {currArticle.votes}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Topic:</strong> {currArticle.topic}
          </p>
          <h3 className="text-lg font-semibold mb-2">
            Author: {currArticle.author}
          </h3>
          <p className="text-gray-800 mb-4">{currArticle.body}</p>
          <p className="text-gray-500 mb-2 italic">
            Published on:{" "}
            {currArticle.created_at
              ? format(new Date(currArticle.created_at), "MMMM d, yyyy")
              : "Unknown date"}
          </p>
          <p className="text-gray-600">
            <strong>Comments:</strong> {currArticle.comment_count}
          </p>
        </div>
      </section>
      <section className="mx-auto p-4 bg-white shadow-md rounded-lg flex flex-col w-4/5 mt-5">
        <h2 className="text-2xl font-bold mb-2 border-b-2 ">Comments</h2>
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="border-b-2">
                <CommentCard comment={comment} />
              </li>
            );
          })}
        </ul>
      </section>
      <CreateComment
        comments={comments}
        setComments={setComments}
        articleID={currArticle.article_id}
      />
    </div>
  );
}
