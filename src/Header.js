import React from "react";

function Header() {
  return (
    <header className="header" style={{ top: "0px" }}>
      {
        <div class="mvisitor-logo">
          <img
            src="mVisitor-logo-mobile@2x.png"
            alt="mVisitor-logo"
            class="logo"
          />
        </div>
      }
    </header>
  );
}

export default Header;
