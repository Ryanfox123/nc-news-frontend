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
    <div className="w-40 ml-3 bg-gray p-4 rounded-sm bg-emerald-100/50 mt-2">
      <h2 className="font-extrabold mx-auto w-20 text-center mb-7">Topics</h2>
      <ul className="flex flex-col gap-4">
        {topics.map((topic) => {
          return (
            <li key={topic.slug} className="border-b-2">
              <p className="hover:underline font-bold">
                <Link
                  to={`/t/${topic.slug}`}
                  onClick={() => {
                    setSortByVals({});
                  }}
                >
                  {topic.slug}
                </Link>
              </p>
              <p className="text-gray-800 italic text-sm">
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
