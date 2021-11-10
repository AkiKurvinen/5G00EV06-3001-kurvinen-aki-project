import React, { useState, useEffect, loadDataOnlyOnce } from "react";
import { Link } from "react-router-dom";

function Recent(props) {
  let [recentSearch, setRecentSearch] = useState([]);
  setRecentSearch(props.currentSearch);

  const html = recentSearch.map(function (val) {
    return <Link to={`/${val}`}> {val}</Link>;
  });
  return <li key={recentSearch}>{html}</li>;
}
export default Recent;
