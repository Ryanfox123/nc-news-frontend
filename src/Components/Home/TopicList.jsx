import React, { useEffect } from "react";
import { getTopics } from "../../../utils";
import { Link } from "react-router-dom";

function TopicList({ topics, setTopics }) {
  useEffect(() => {
    getTopics().then((results) => {
      setTopics(results);
    });
  }, []);
  return (
    <div className="w-40 ml-3 bg-slate-200 p-4">
      <h2 className="underline font-extrabold mx-auto w-20 text-center mb-7">
        Topics
      </h2>
      <ul className="flex flex-col gap-4">
        {topics.map((topic) => {
          return (
            <li key={topic.slug}>
              <p className="hover:underline">
                <Link to={`/t/${topic.slug}`}>{topic.slug}</Link>
              </p>
              <p className="text-gray-500 italic text-sm">
                {topic.description}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TopicList;
