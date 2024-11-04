import { useEffect, useState } from "react";
import Header from "../Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentCard from "./CommentCard";
import { format } from "date-fns";
import { getArticleByID, getCommentsByID } from "../../../utils";

export default function ArticleInfo() {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(currArticle);

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

  if (loading) return <p>Loading..</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header />
      <section className="mx-auto p-4 bg-white shadow-md rounded-lg flex flex-row w-4/5">
        <div>
          <img
            className="rounded-lg mb-4 h-[300px] w-full p-2"
            src={currArticle.article_img_url}
            alt={currArticle.title}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">{currArticle.title}</h2>
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
    </div>
  );
}
