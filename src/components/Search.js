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
      <input
        type="text"
        value={name}
        placeholder="Find drink recipe"
        onChange={(e) => setName(e.target.value)}
      />

      <input type="submit" value="Search" />
    </form>
  );
}
export default Search;
