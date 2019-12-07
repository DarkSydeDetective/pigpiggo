import React from "react";
import "./SearchBox.scss";

const SearchBox = ({ keyword, title, handleKeywordChange, handleTitleChange }) => {
  // Add show/hide advanced options functionality when we have more advanced search options
  // const [showAdvanced, setShowAdvanced] = useState(title ? true : false);
  const showAdvanced = true;
  return (
    <div className="search-box">
      <div className="main-search-wrap">
        <div className="main-search">
          <label htmlFor="search">
            <span>Keyword (required)</span>
            <div className="keyword-control-wrap">
              <input
                id="search"
                value={keyword}
                onChange={handleKeywordChange}
                type="search"
                placeholder="Enter word or phrase Dave said"
              />
              <button type="submit">Go</button>
            </div>
          </label>
        </div>
      </div>
      <div className="advanced-search">
        {/* <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="advanced-search-button">Advanced search <i className={`fas fa-caret-${showAdvanced ? 'up' : 'down'}`}></i></button> */}
        { showAdvanced ? 
        <div className="title-wrap">
          <label htmlFor="title">
            <span>Video title (optional)</span>
            <input
              id="title"
              value={title}
              onChange={handleTitleChange}
              type="search"
              placeholder="Enter video title"
            />
          </label>
        </div>
       : null }
      </div>
    </div>
  );
};

export default SearchBox;
