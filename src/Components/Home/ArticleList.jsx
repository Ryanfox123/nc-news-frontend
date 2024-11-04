import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "../ArticleCard";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-news-app-ftk2.onrender.com/api/articles")
      .then((res) => {
        setArticles(res.data.articles[0]);
      });
  }, []);

  return (
    <div className="w-8/12 mx-auto">
      <ul className="flex flex-col gap-5">
        {articles && articles.length > 0 ? (
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
