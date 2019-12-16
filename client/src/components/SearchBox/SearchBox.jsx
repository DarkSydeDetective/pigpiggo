import React from "react";
import "./SearchBox.scss";
import DatePicker from "react-date-picker"
import "react-date-picker/dist/DatePicker.css"

const SearchBox = ({ keyword, title, startDate, endDate, handleKeywordChange, handleTitleChange, handleStartDateChange, handleEndDateChange }) => {
  // Add show/hide advanced options functionality when we have more advanced search options
  // const [showAdvanced, setShowAdvanced] = useState(title ? true : false);
  const showAdvanced = true;
  const showDate = true;

  if (showDate) {
	  if (startDate) {
		startDate = new Date(startDate);
	  }
	  if (endDate) {
		  endDate = new Date(endDate);
	  }
  }
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
	{showDate ?
	<div className="date-search-box">
		<div className="title-wrap">
		  <label htmlFor="startDate">
			<span>Start Date (optional)</span><br/>
			<DatePicker
				id="startDate"
				value={startDate}
				onChange={handleStartDateChange}
				dateFormat="yyyy-MM-dd"
			/>
		  </label>
		</div>
		<div className="title-wrap">
		  <label htmlFor="endDate">
			<span>End Date (optional)</span><br/>
			<DatePicker
				id="endDate"
				value={endDate}
				onChange={handleEndDateChange}
				dateFormat="yyyy-MM-dd"
			/>
		  </label>
		</div>
	</div>
	: null }
    </div>
  );
};

export default SearchBox;
