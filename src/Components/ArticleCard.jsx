import { Link } from "react-router-dom";
import { format } from "date-fns";
export default function ArticleCard({ article }) {
  return (
    <div className="flex flex-row bg-slate-100 p-2">
      <img
        className="rounded-lg mb-4 h-[100px] w-[100] p-2"
        src={article.article_img_url}
      />
      <div>
        <div className="">
          <h3 className="underline hover:text-sky-700 ext-2xl font-bold mb-2">
            <Link to={`/article/${article.article_id}`}>{article.title}</Link>
          </h3>
          <p>
            <strong className="text-gray-600 mb-2">{article.topic}</strong>
          </p>
        </div>
        <p>
          <strong>Created by:</strong> {article.author}
        </p>
        <p>
          <strong>Date: </strong>
          {article.created_at
            ? format(new Date(article.created_at), "MMMM d, yyyy")
            : "Unknown date"}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Votes: </strong>
          {article.votes}
        </p>
        <p className="hover:underline">
          <Link to={`/article/${article.article_id}`}>
            <strong> Comments:</strong>
            {article.comment_count}
          </Link>
        </p>
      </div>
    </div>
  );
}
