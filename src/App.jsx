import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ArticleInfo from "./Components/Article/ArticleInfo";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:article_id" element={<ArticleInfo />} />
      </Routes>
    </>
  );
}

export default App;
