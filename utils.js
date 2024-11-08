import axios from "axios";
const api = axios.create({
  baseURL: "https://nc-news-app-ftk2.onrender.com/api",
});

export const getArticles = (params, topic) => {
  const url = topic ? `/articles?topic=${topic}` : "/articles";

  return api
    .get(url, {
      params: {
        sort_by: params.queryVal,
        order_by: params.order,
      },
    })
    .then((res) => res.data.articles);
};

export const postArticle = (body) => {
  return api.post("/articles/", body).then((res) => {
    return res.data.article;
  });
};

export const getArticleByID = (id) => {
  return api.get(`/articles/${id}`).then((res) => {
    return res.data.article;
  });
};

export const deleteArticleBy = (id) => {
  return api.delete(``);
};

export const getUserByUsername = (username) => {
  return api.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const getTopics = () => {
  return api.get("/topics").then((res) => {
    return res.data.topics;
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

export const deleteCommentByID = (id) => {
  return api.delete(`/comments/${id}`).then((res) => {
    return res;
  });
};

export const patchArticleVotes = (id, inc) => {
  const voteBody = { inc_votes: inc };
  return api.patch(`/articles/${id}`, voteBody).then((res) => {
    return res;
  });
};
