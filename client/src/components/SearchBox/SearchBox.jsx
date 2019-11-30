import React from "react";
import "./SearchBox.css";

const searchBox = ({ search, handleChange }) => {
  return (
    <div className="search-box">
      <label htmlFor="search">
        <input
          id="search"
          value={search}
          onChange={handleChange}
          type="search"
          placeholder="Enter search term"
        />
      </label>
      <button type="submit">Go</button>
    </div>
  );
};

export default searchBox;
