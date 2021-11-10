import React from "react";

function Header() {
  return (
    <a href="/">
      <header
        style={{
          backgroundImage: `url("../images/app-logo.png")`,
          backgroundRepeat: "no-repeat",
        }}
      ></header>
    </a>
  );
}
export default Header;
