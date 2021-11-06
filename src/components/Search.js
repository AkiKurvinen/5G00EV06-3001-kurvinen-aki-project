import React, { useState } from "react";

function Search() {
  const [name, setName] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //  alert(`Your search: ${name}`);
    window.location.href = `/${name}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Find drink recipe:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
}
export default Search;
