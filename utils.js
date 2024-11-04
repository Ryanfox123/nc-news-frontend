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
  return api
    .get(`https://nc-news-app-ftk2.onrender.com/api/articles/${id}/comments`)
    .then((res) => {
      return res.data.comments;
    });
};
