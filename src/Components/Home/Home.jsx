import ArticleList from "./ArticleList";
import TopicList from "./TopicList";

function Home({ topics, setTopics }) {
  return (
    <div className="flex flex-row">
      <TopicList topics={topics} setTopics={setTopics} />
      <ArticleList />
    </div>
  );
}

export default Home;
