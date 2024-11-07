import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PostArticleForm from "./PostArticleForm";
import CreatePostBtn from "../CreatePostBtn";

function PostArticle({ isPosting, setIsPosting }) {
  const { user } = useContext(UserContext);

  return (
    <div className="h-14 mb-10">
      {isPosting ? (
        <PostArticleForm />
      ) : (
        <CreatePostBtn setIsPosting={setIsPosting} />
      )}
    </div>
  );
}

export default PostArticle;
