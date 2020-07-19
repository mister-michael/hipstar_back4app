import React, { useState, useEffect } from "react";
import mAPI from "../../modules/movieManager"

import SearchCard from "./SearchCard"
import SearchCardRebuild from "./SearchCardRebuild"
import "./Search.css"

const Search = (props) => {

  const [keyword, setKeyword] = useState({ searchInput: "" });
  const [results, setResults] = useState([]);

  const handleFieldChange = evt => {
    const stateToChange = { ...keyword };
    stateToChange[evt.target.id] = evt.target.value;
    setKeyword(stateToChange);
  };

  const handleSearch = () => {
    const stringArr = keyword.searchInput.split(" ").join("+");
    mAPI.search(stringArr)
      .then(searchResults => {
        setResults(searchResults.results);
      });
  };
  

  useEffect(() => {
  }, [results]);

  return (
    <>
        <div className="headline headlineRed headlineTextBlack">search
          <div className="movieSearchInput">
            <input
              id="searchInput"
              className="greenBorder movieSearchInput"
              type="text"
              placeholder="movie title"
              onChange={handleFieldChange}
              onKeyUp={evt => evt.key === "Enter" ? handleSearch(evt) : null}
            />
          </div>
        </div>
      <div className="resultsPage">
        {/* <div id="searchResults" className="cardGroup marginTop">
          {results.map(res => <SearchCard className="" loveHateId={loveHateId} setLoveHateId={setLoveHateId} keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} key={res.id} result={res} searchInput={searchInput} userId={props.activeUserId} {...props} />)}
        </div> */}
        <div id="searchResults" className="cardGroup marginTop">
          {results.map(res => <SearchCardRebuild searchResults={results} result={res} {...props} />)}
        </div>
      </div>
    </>
  )
};

export default Search;