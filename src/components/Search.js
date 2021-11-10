import React, { useState } from "react";

function Search() {
  let [name, setName] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // fix common search mistakes:
    if (name.toLowerCase() === "b52" || name.toLowerCase() === "b 52") {
      name = "b-52";
    }

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
