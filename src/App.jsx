import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ArticleInfo from "./Components/Article/ArticleInfo";
import Header from "./Components/Header";
import { useState } from "react";
import TopicArticleList from "./Components/ArticlesByTopic/TopicArticleList";

function App() {
  const [topics, setTopics] = useState([]);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home topics={topics} setTopics={setTopics} />}
        />
        <Route path="/article/:article_id" element={<ArticleInfo />} />
        <Route path="/t/:topic" element={<TopicArticleList />} />
      </Routes>
    </>
  );
}

export default App;
