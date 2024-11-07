import { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard";
import { getArticles } from "../../../utils";
import SortingArticlesMenu from "./SortingArticlesMenu";

function ArticleList({ sortByVals, setSortByVals }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles(sortByVals)
      .then((articles) => {
        setArticles(articles[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles data.");
        setLoading(false);
      });
  }, [sortByVals]);

  if (loading) return <p>Loading..</p>;
  if (error) return <p className="text-center p-10">{error}</p>;

  return (
    <div className="mx-auto p-4shadow-md rounded-lg w-4/5 mt-2">
      <SortingArticlesMenu setSortByVals={setSortByVals} />
      <ul className="flex flex-col gap-5">
        {articles ? (
          articles.map((article) => (
            <li key={article.article_id}>
              <ArticleCard article={article} setSortByVals={setSortByVals} />
            </li>
          ))
        ) : (
          <li>No articles available</li>
        )}
      </ul>
    </div>
  );
}

export default ArticleList;
