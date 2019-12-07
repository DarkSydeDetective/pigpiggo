import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Search.scss";
import SearchBox from "../../components/SearchBox/SearchBox";
import moment from "moment";
import config from "../../config";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Search = props => {
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ start: 0, keyword: '', title: '' });
  const [keyword, setKeyword] = useState("");
  const [start, setStart] = useState(0);
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);

  // set initial state on startup
  useEffect(() => {
    const params = qs.parse(props.location.search, {
      ignoreQueryPrefix: false
    });
    const initialSearchParams = { start: 0, keyword: '', title: '' };
    if (params.keyword) {
      initialSearchParams.keyword = params.keyword;
      setKeyword(params.keyword);
    }
    if (params.title) {
      initialSearchParams.title = params.title;
      setTitle(params.title);
    }
    if (params.start) {
      const startNum = parseInt(params.start);
      initialSearchParams.start = startNum;
      setStart(startNum);
    }
    setSearchParams(initialSearchParams);
  }, []);

  useEffect(() => {
    performSearch();
  }, [searchParams]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!keyword) return;
    setStart(0);
    setSearchParams({ keyword, title, start: 0 });
  };

  const performSearch = () => {
    const { keyword, title, start } = searchParams;
    props.history.push(`/?keyword=${keyword}&title=${title}&start=${start}`);
    if (!keyword) return;
    setLoading(true);
    axios
      .get(config.api.url, { params: { keyword, title, start } })
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
    let newStart = Math.ceil(selected * config.resultsPerPage);
    setStart(newStart);
    setSearchParams({ keyword, title, start: newStart });
  };

  const handleKeywordInputChange = e => {
    setKeyword(e.target.value);
  };

  const handleTitleInputChange = e => {
    setTitle(e.target.value);
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
        Found {resultCount} results for '{searchParams.keyword}'. Displaying {searchParams.start + 1} -{" "}
        {searchParams.start + config.resultsPerPage > resultCount ? resultCount : searchParams.start + config.resultsPerPage}
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
            <SearchBox keyword={keyword} title={title} handleKeywordChange={handleKeywordInputChange} handleTitleChange={handleTitleInputChange} />
          </div>
        </form>
      </section>
      <section className="results">{resultsJsx}</section>
      {resultCount && resultCount > config.resultsPerPage && !loading ? (
        <section>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            forcePage={Math.ceil(start / config.resultsPerPage)}
            breakClassName={"break-me"}
            pageCount={Math.ceil(resultCount / config.resultsPerPage)}
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
