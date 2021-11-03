import React from "react";

function Search() {
  return (
    <div>
      <label>
        Find drink recipe:
        <input type="text" name="keyword" />
      </label>
      <input type="submit" value="Search" />
    </div>
  );
}
export default Search;
