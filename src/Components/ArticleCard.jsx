import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function ArticleCard({ article, setSortByVals }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-row bg-slate-100 p-2 rounded-lg shadow hover:shadow-md transition-shadow duration-300 w-full gap-x-4 items-start">
      <Link
        to={`/article/${article.article_id}`}
        onClick={() => {
          setSortByVals({});
        }}
      >
        {!imageError ? (
          <img
            className="rounded-lg h-[200px] w-[200px] object-cover"
            src={article.article_img_url}
            alt={article.title}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-[200px] w-[200px] flex items-center justify-center bg-gray-200 rounded-lg text-gray-700 font-medium">
            {article.title}
          </div>
        )}
      </Link>
      <div className="flex flex-col space-y-2">
        <div>
          <h3 className="text-2xl font-bold mb-1 text-gray-800 hover:text-custom-turq2 transition-colors duration-200">
            <Link
              to={`/article/${article.article_id}`}
              onClick={() => {
                setSortByVals({});
              }}
            >
              {article.title}
            </Link>
          </h3>
          <p className="text-gray-600 text-sm">
            <strong>{article.topic}</strong>
          </p>
        </div>
        <p className="text-gray-700 text-sm">
          <strong>Created by:</strong> {article.author}
        </p>
        <p className="text-gray-700 text-sm">
          <strong>Date: </strong>
          {article.created_at
            ? format(new Date(article.created_at), "MMMM d, yyyy")
            : "Unknown date"}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Votes:</strong> {article.votes}
        </p>
        <p className="text-custom-turq3 hover:underline text-sm">
          <Link
            to={`/article/${article.article_id}`}
            onClick={() => {
              setSortByVals({});
            }}
          >
            <strong>Comments:</strong> {article.comment_count}
          </Link>
        </p>
      </div>
    </div>
  );
}
