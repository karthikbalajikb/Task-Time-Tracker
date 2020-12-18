import React, { useState } from "react";

/**
 * Todo: debounce
 * @onSearch
 */
const Search = ({ onSearch }) => (
    <div>
      <label>Search </label>
      <input
        className="border border-solid rounded focus:outline-none px-4 leading-tight text-sm font-normal placeholder-gray-500 placeholder-opacity-75 h-8"
        type="text"
        onChange={onSearch}
      />
    </div>
  );


export default Search;
