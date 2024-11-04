import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Article from "./Components/Article/Article";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:article_id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
