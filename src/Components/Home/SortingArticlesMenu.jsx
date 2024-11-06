import React from "react";

function SortingArticlesMenu({ setSortByVals }) {
  const handleQueryChange = (e) => {
    setSortByVals((prev) => {
      return { ...prev, queryVal: e.target.value };
    });
  };
  const handleOrderChange = (e) => {
    setSortByVals((prev) => {
      return { ...prev, order: e.target.value };
    });
  };
  return (
    <div className="flex flex-row gap-3 justify-end mb-3">
      <p>Sort by:</p>
      <select id="sort-by-val" onChange={handleQueryChange}>
        <option value="created_at">Date</option>
        <option value="comment_count">Comment count</option>
        <option value="votes">Votes</option>
      </select>
      <select id="sort-by-order" onChange={handleOrderChange}>
        <option value="DESC">Descending</option>
        <option value="ASC">Ascending</option>
      </select>
    </div>
  );
}

export default SortingArticlesMenu;
