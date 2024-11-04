import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Article() {
  let { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  useEffect(() => {
    axios
      .get(`https://nc-news-app-ftk2.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        setCurrArticle(res.data.article);
      });
  }, []);
  return (
    <div>
      <Header />
      <section className="mx-auto p-4 bg-white shadow-md rounded-lg flex flex-row w-4/5">
        <div>
          <img
            className="rounded-lg mb-4 h-[300px] w-full p-2"
            src={currArticle.article_img_url}
            alt={currArticle.title}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">{currArticle.title}</h2>
          <p className="text-gray-600 mb-2">
            <strong>Votes:</strong> {currArticle.votes}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Topic:</strong> {currArticle.topic}
          </p>
          <h3 className="text-lg font-semibold mb-2">
            Author: {currArticle.author}
          </h3>
          <p className="text-gray-800 mb-4">{currArticle.body}</p>
          <p className="text-gray-500 mb-2">
            <em>Published on: {currArticle.created_at}</em>
          </p>
          <p className="text-gray-600">
            <strong>Comments:</strong> {currArticle.comment_count}
          </p>
        </div>
      </section>
    </div>
  );
}