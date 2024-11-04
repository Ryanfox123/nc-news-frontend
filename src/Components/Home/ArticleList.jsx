import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "../ArticleCard";
import { getArticles } from "../../../utils";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then((articles) => {
        setArticles(articles[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-8/12 mx-auto">
      <ul className="flex flex-col gap-5">
        {articles ? (
          articles.map((article) => (
            <li key={article.article_id}>
              <ArticleCard article={article} />
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
