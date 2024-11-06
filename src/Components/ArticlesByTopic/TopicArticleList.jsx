import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../../../utils";
import ArticleCard from "../ArticleCard";

function TopicArticleList() {
  const [topicArticles, setTopicArticles] = useState([]);
  const { topic } = useParams();
  useEffect(() => {
    getArticles(topic).then((res) => {
      setTopicArticles(res[0]);
    });
  }, []);
  return (
    <div>
      <h2 className="font-extrabold text-3xl mb-2 ml-2">{topic}</h2>
      <ul>
        {topicArticles.map((article) => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TopicArticleList;
