import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { postArticle } from "../../../utils";
import Editor from "react-simple-wysiwyg";

function PostArticleForm({ setIsPosting, topics, setArticles }) {
  const { user } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState({ author: user.username });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);
  const [html, setHtml] = useState("my <b>HTML</b>");

  const handleChange = (key, value) => {
    setPostInfo((currPost) => {
      return { ...currPost, [key]: value };
    });
  };
  const handleSubmit = (e) => {
    setIsError(null);
    setIsLoading(true);
    e.preventDefault();
    postArticle(postInfo)
      .then((res) => {
        setIsLoading(false);
        setIsError(null);
        setArticles((currArticles) => {
          return [res, ...currArticles];
        });
        setIsPosting(false);
      })
      .catch((err) => {
        if (err.status === 400) {
          setIsError(
            "You are missing post information, please provide a title, topic, and description."
          );
        } else {
          setIsError(
            "There was a problem posting your article, please try again later."
          );
        }
        setIsLoading(false);
      });
  };
  return (
    <div className="p-6 bg-gray-50 shadow-lg rounded-lg flex flex-col w-full my-3 h-max">
      <h2 className="text-2xl text-center">Posting new article</h2>
      <form
        id="post-Article"
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="post-title">Article Title:</label>
        <input
          id="title"
          className="
          pl-2 bg-white border border-gray-300 rounded-md resize-none text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <label htmlFor="select-topic">Topic:</label>
        <select
          id="topic"
          form="post-Article"
          onChange={(e) => handleChange("topic", e.target.value)}
        >
          <option>Please select a topic:</option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <label htmlFor="body">Article Body:</label>
        <Editor
          value={postInfo.body}
          onChange={(e) => handleChange("body", e.target.value)}
        />
        <label>Image URL</label>
        <input
          type="text"
          id="article_image_url"
          className="bg-white border border-gray-300 rounded-md resize-none p-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => handleChange("article_image_url", e.target.value)}
        />
        <div className="mt-2 flex flex-row justify-between">
          <button
            onClick={() => {
              setIsPosting(false);
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-md px-4 py-2 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="submit"
            value={isLoading ? "Posting Article.." : "Post Article"}
            className="bg-custom-turq2 shadow-md hover:bg-custom-turq3 text-white font-semibold rounded-md px-4 py-2 transition duration-200 ease-in-out"
          />
        </div>
      </form>
    </div>
  );
}

export default PostArticleForm;
