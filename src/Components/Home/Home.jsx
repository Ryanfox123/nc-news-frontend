import ArticleList from "./ArticleList";
import TopicList from "./TopicList";

function Home({ topics, setTopics, setSortByVals, sortByVals }) {
  return (
    <div className="flex flex-row bg-gray-100">
      <TopicList
        topics={topics}
        setTopics={setTopics}
        setSortByVals={setSortByVals}
      />
      <ArticleList setSortByVals={setSortByVals} sortByVals={sortByVals} />
    </div>
  );
}

export default Home;
