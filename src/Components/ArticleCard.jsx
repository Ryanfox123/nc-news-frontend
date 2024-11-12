import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import upArrowIcon from "../assets/—Pngtree—vector up arrow icon_4187256.png";
import commentIcon from "../assets/Instagram-icon-template-on-transparent-background-PNG.png";

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
          <div className="h-[200px] w-[200px] flex items-center justify-center bg-emerald-800 rounded-lg text-gray-200 font-medium">
            {article.title}
          </div>
        )}
      </Link>
      <div className="flex flex-col gap-4 space-y-2">
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
        <div className="flex flex-row gap-2">
          <img
            src={upArrowIcon}
            className="w-5 h-5 bg-gray-300 rounded-3xl "
            aria-hidden="true"
          />
          <p className="text-gray-600 text-sm font-bold">
            {article.votes} <span className="sr-only">votes</span>
          </p>
          <Link
            to={`/article/${article.article_id}`}
            onClick={() => {
              setSortByVals({});
            }}
            className="flex flex-row gap-2"
          >
            <img
              className="w-5 h-5 bg-gray-300 rounded-3xl"
              src={commentIcon}
              aria-hidden="true"
            />
            <p className="text-emerald-900 hover:underline text-sm font-bold">
              {article.comment_count}
              <span className="sr-only"> comments</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
