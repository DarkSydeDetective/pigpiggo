import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Search.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import moment from "moment";
import config from "../../config";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Search = props => {
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [start, setStart] = useState(0);
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    const searchParam = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).search;
    const startParam = qs.parse(props.location.start, {
      ignoreQueryPrefix: true
    }).start;
    if (searchParam) {
      setSearch(searchParam);
      setSearchInput(searchParam);
    }
    if (startParam) {
      setStart(parseInt(startParam));
    }
    if (searchParam || startParam) {
      performSearch(searchParam, startParam);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setStart(0);
    setSearch(searchInput);
    performSearch(searchInput, 0);
  };

  const performSearch = (newSearch = search, newStart = start) => {
    props.history.push(`/?search=${newSearch}&start=${newStart}`);
    if (newSearch === "") return;
    setLoading(true);
    axios
      .get(config.api.url, { params: { search: newSearch, start: newStart } })
      .then(res => {
        const videos = res.data;
        setResultCount(
          res.data && res.data.length > 0 ? res.data[0].full_count : 0
        );
        setLoading(false);
        setHasSearched(true);
        setResults(videos);
      });
  };

  const handlePageClick = data => {
    let selected = data.selected;
    let newStart = Math.ceil(selected * 50);
    setStart(newStart);
    performSearch(search, newStart);
  };

  const handleSearchInputChange = e => {
    setSearchInput(e.target.value);
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
    const maxResults = (
      <p className="results-over">
        Found {resultCount} results for '{search}'. Displaying {start + 1} -{" "}
        {start + 50 > resultCount ? resultCount : start + 50}
      </p>
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
            <SearchBox search={searchInput} handleChange={handleSearchInputChange} />
          </div>
        </form>
      </section>
      <section className="results">{resultsJsx}</section>
      {resultCount && resultCount > 50 && !loading ? (
        <section>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            forcePage={Math.ceil(start / 50)}
            breakClassName={"break-me"}
            pageCount={Math.ceil(resultCount / 50)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </section>
      ) : null}
    </React.Fragment>
  );
};

export default withRouter(Search);
