import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Search.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import moment from "moment";
import config from "../../config";
import qs from "query-string";
import { withRouter } from "react-router-dom";

const Search = props => {
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchParam = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).search;
    if (searchParam) {
      setSearch(searchParam);
      performSearch(searchParam);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    performSearch();
  };

  const performSearch = (newSearch = search) => {
    props.history.push(`/?search=${newSearch}`);
    if (newSearch === "") return;
    setLoading(true);
    axios.get(config.api.url, { params: { search: newSearch } }).then(res => {
      const videos = res.data;
      setLoading(false);
      setHasSearched(true);
      setResults(videos);
    });
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
  };

  let resultsJsx;
  if (loading) {
    resultsJsx = (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> MASSIVE delay, this site
        SUCKS dood
      </div>
    );
  } else if (results && results.length > 0) {
    const resultList = results.map(r => {
      const uploaded = moment(r.uploaded);
      const timeStamp = moment()
        .startOf("day")
        .seconds(parseInt(r.time))
        .format("HH:mm:ss");

      return (
        <li key={r.id}>
          <a
            className="thumbnail"
            href={`https://www.youtube.com/watch?v=${r.video_id}&t=${r.time}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt={r.title} src={r.thumbnail} />
          </a>
          <div className="details">
            <a
              href={`https://www.youtube.com/watch?v=${r.video_id}&t=${r.time}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {r.title}
            </a>
            <div className="details-wrap">
              <div className="details-label">Uploaded</div>
              <div className="details-data">
                {uploaded.format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="details-wrap">
              <div className="details-label">Khantext</div>
              <div className="details-data">"{r.text}"</div>
            </div>
            <div className="details-wrap">
              <div className="details-label">Timestamp</div>
              <div className="details-data">
                <a
                  href={`https://www.youtube.com/watch?v=${r.video_id}&t=${r.time}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {timeStamp}
                </a>
              </div>
            </div>
          </div>
        </li>
      );
    });
    const maxResults =
      results.length === 200 ? (
        <p className="results-over">
          Over 200 results found. Displaying the first 200
        </p>
      ) : (
        <p className="results-over">{results.length} results</p>
      );

    resultsJsx = (
      <div className="search-results">
        {maxResults}
        <ul className="search-result-list">{resultList}</ul>
      </div>
    );
  } else if (hasSearched) {
    resultsJsx = (
      <div className="search-results">
        Wuuhhttt?? No results? Stoopid algorithm
      </div>
    );
  } else {
    resultsJsx = null;
  }

  return (
    <React.Fragment>
      <section className="search-form">
        <form onSubmit={handleSubmit}>
          <div className="search-wrap">
            <SearchBox search={search} handleChange={handleSearchChange} />
          </div>
        </form>
      </section>
      <section className="results">{resultsJsx}</section>
    </React.Fragment>
  );
};

export default withRouter(Search);
