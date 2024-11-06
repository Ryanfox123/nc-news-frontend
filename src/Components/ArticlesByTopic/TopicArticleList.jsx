import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../../../utils";
import ArticleCard from "../ArticleCard";
import SortingArticlesMenu from "../Home/SortingArticlesMenu";
import { Link } from "react-router-dom";

function TopicArticleList({ sortByVals, setSortByVals }) {
  const [topicArticles, setTopicArticles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { topic } = useParams();
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles(sortByVals, topic)
      .then((res) => {
        setIsLoading(false);
        setTopicArticles(res[0]);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [sortByVals]);
  return (
    <div>
      {isError ? (
        <p className="text-center p-10">
          There was an error loading articles, please try again later <br />
          <span className="underline">
            <Link to="/">Return home</Link>
          </span>
        </p>
      ) : (
        <>
          <h2 className="font-extrabold text-3xl mb-2 ml-2">{topic}</h2>
          <SortingArticlesMenu setSortByVals={setSortByVals} />
          {isLoading ? (
            <p>Loading articles..</p>
          ) : (
            <ul>
              {topicArticles.map((article) => {
                return (
                  <li key={article.article_id}>
                    <ArticleCard article={article} />
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default TopicArticleList;
