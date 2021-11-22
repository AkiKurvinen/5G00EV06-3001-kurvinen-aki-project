import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Recent function is not implemented
function Recent(props) {
  let [recentSearch, setRecentSearch] = useState([]);
  useEffect(() => {
    if (recentSearch.includes(props.currentSearch) && props.currentSearch) {
      console.log(props.currentSearch);
      setRecentSearch(recentSearch.push(props.currentSearch));
    }
  }, [props.currentSearch, recentSearch]);

  let html = "";
  if (props.currentSearch) {
    html = recentSearch.map(function (val) {
      return (
        <Link key={val} to={`/${val}`}>
          {" "}
          {val}
        </Link>
      );
    });
  }
  return (
    <li className="drinklist" key={recentSearch}>
      {html}
    </li>
  );
}
export default Recent;
