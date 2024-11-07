import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { postArticle } from "../../../utils";

function PostArticleForm({ setIsPosting, topics, setArticles }) {
  const { user } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState({ author: user.username });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  const handleChange = (e) => {
    setPostInfo((currPost) => {
      return { ...currPost, [e.target.id]: e.target.value };
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
          onChange={handleChange}
        />
        <label htmlFor="select-topic">Topic:</label>
        <select id="topic" form="post-Article" onChange={handleChange}>
          <option>Please select a topic:</option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <label htmlFor="post-body">Article Body:</label>
        <textarea
          className="bg-white border border-gray-300 rounded-md resize-none p-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          id="body"
          type="text"
          onChange={handleChange}
        />
        <label>Image URL</label>
        <input
          type="text"
          id="article_image_url"
          className="bg-white border border-gray-300 rounded-md resize-none p-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleChange}
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
