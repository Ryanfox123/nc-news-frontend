import { Link } from "react-router-dom";
import { format } from "date-fns";
export default function ArticleCard({ article }) {
  return (
    <div className="flex flex-row bg-slate-100  p-2 rounded-lg shadow hover:shadow-md transition-shadow duration-300 w-full gap-x-4 items-start">
      <Link to={`/article/${article.article_id}`}>
        <img
          className="rounded-lg h-[150px] w-[150px] object-cover"
          src={article.article_img_url}
          alt={article.title}
        />
      </Link>
      <div className="flex flex-col space-y-2">
        <div>
          <h3 className="text-2xl font-bold mb-1 text-gray-800 hover:text-sky-700 transition-colors duration-200">
            <Link to={`/article/${article.article_id}`}>{article.title}</Link>
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
        <p className="text-blue-600 hover:underline text-sm">
          <Link to={`/article/${article.article_id}`}>
            <strong>Comments:</strong> {article.comment_count}
          </Link>
        </p>
      </div>
    </div>
  );
}
