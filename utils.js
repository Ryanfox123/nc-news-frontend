import axios from "axios";
const api = axios.create({
  baseURL: "https://nc-news-app-ftk2.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then((res) => {
    return res.data.articles;
  });
};

export const getArticleByID = (id) => {
  return api.get(`/articles/${id}`).then((res) => {
    return res.data.article;
  });
};

export const getCommentsByID = (id) => {
  return api.get(`/articles/${id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const postCommentByID = (id, body, user) => {
  const commentBody = { username: user, body: body };
  return api.post(`/articles/${id}/comments`, commentBody).then((res) => {
    return res.data.comment;
  });
};

export const patchArticleVotes = (id, inc) => {
  const voteBody = { inc_votes: inc };
  return api.patch(`/articles/${id}`, voteBody).then((res) => {
    return res;
  });
};
