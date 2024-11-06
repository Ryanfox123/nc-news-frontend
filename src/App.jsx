import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import ArticleInfo from "./Components/Article/ArticleInfo";
import Header from "./Components/Header";
import { useState } from "react";
import TopicArticleList from "./Components/ArticlesByTopic/TopicArticleList";
import ErrorPage from "./Components/ErrorPage";
import LoginPage from "./Components/Login/LoginPage";

function App() {
  const [topics, setTopics] = useState([]);
  const [sortByVals, setSortByVals] = useState({
    queryVal: "created_at",
    order: "DESC",
  });
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && (
        <Header setSortByVals={setSortByVals} />
      )}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <Home
              topics={topics}
              setTopics={setTopics}
              sortByVals={sortByVals}
              setSortByVals={setSortByVals}
            />
          }
        />
        <Route path="/article/:article_id" element={<ArticleInfo />} />
        <Route
          path="/t/:topic"
          element={
            <TopicArticleList
              setSortByVals={setSortByVals}
              sortByVals={sortByVals}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
