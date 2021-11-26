import React, { useState } from "react";
//import Recent from "./Recent.js";

function Search() {
  let [name, setName] = useState("");

  function regCheck(data) {
    let regularExpression = /^[ a-zA-Z0-9._-]+$/;
    if (regularExpression.test(data)) {
      return false;
    } else {
      return true;
    }
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();

    // prevent unnecessary special characters in search
    // and give feedback to user
    if (regCheck(name)) {
      document.getElementById("searchInput").className = "errInput";
      let element = document.getElementById("searchInfo");
      element.innerHTML = "Invalid characters in search";
      element.className = "";
    } else {
      document.getElementById("searchInfo").className = "";
      document.getElementById("searchInput").className = "displayNone";
      // fix common search mistakes:
      if (name === "b52" || name === "b 52") {
        name = "b-52";
      }
      window.location.href = `/${name}`;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="searchInput"
        type="text"
        value={name}
        placeholder="Find drink recipe"
        autoComplete="off"
        onChange={(e) => setName(e.target.value.toLocaleLowerCase())}
      />

      <input type="submit" value="Search" />
      <p id="searchInfo" className="displayNone"></p>
    </form>
  );
}
export default Search;
