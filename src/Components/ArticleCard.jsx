import React from "react";

export default function ArticleCard({ article }) {
  return (
    <div>
      <h3>{article.title}</h3>
      <p>{article.topic}</p>
      <img className="size-24" src={article.article_img_url} />
      <p>Created by: {article.author}</p>
      <p>Date:{article.created_at}</p>
      <p>Votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
    </div>
  );
}
