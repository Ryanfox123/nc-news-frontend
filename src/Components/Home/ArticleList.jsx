import { useState, useEffect, useContext } from "react";
import ArticleCard from "../ArticleCard";
import { getArticles } from "../../../utils";
import SortingArticlesMenu from "./SortingArticlesMenu";
import CreatePostBtn from "../CreatePostBtn";
import { UserContext } from "../../context/UserContext";
import PostArticleForm from "./PostArticleForm";
import Pagination from "../pagination";

function ArticleList({ sortByVals, setSortByVals, topics }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [pageInfo, setPageInfo] = useState({});

  const { user } = useContext(UserContext);

  useEffect(() => {
    getArticles(sortByVals)
      .then((articles) => {
        setArticles(articles[0]);
        setPageInfo(articles[1]);
        console.log(pageInfo);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles data.");
        setLoading(false);
      });
  }, [sortByVals]);

  if (loading) return <p className="text-center p-10">Loading..</p>;
  if (error) return <p className="text-center p-10">{error}</p>;

  return (
    <div className="mx-auto p-4shadow-md rounded-lg w-4/5 mt-2 flex flex-col">
      <div className="flex flex-row h-10 mb-2">
        <div className="w-2/4">
          {Object.keys(user).length === 0 ? null : !isPosting ? (
            <CreatePostBtn setIsPosting={setIsPosting} />
          ) : null}
        </div>

        <div className="align-bottom w-2/4">
          <SortingArticlesMenu setSortByVals={setSortByVals} />
        </div>
      </div>
      {isPosting && (
        <PostArticleForm
          setIsPosting={setIsPosting}
          topics={topics}
          setArticles={setArticles}
        />
      )}
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
      <Pagination />
    </div>
  );
}

export default ArticleList;
