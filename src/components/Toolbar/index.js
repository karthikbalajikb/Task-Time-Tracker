import React from "react";

// components
import Search from "../Search";

// queries
import { SEARCH_TASKS_BY_TITLE } from "../../queries/tasks";

/**
 * Todo: Search and filter
 *
 */
const Toolbar = () => {
  const handleSearch = (event) => {
    // To be implemented
    console.log("search term >>", event.target.value);
  };

  return <Search onSearch={handleSearch} />;
};

export default Toolbar;
