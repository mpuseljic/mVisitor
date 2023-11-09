import React from "react";
import { useLocation } from "react-router-dom";

function Head() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customTitle = queryParams.get("q");

  return (
    <div className="blue-head">
      <div className="container">
        <div className="head-title">
          <h1 className="title">{customTitle ? customTitle : "Forest Hill"}</h1>
          <h1 className="title">CHECK-IN</h1>
        </div>
      </div>
      <div className="language-selector">
        <a href="index.html">🇺🇸</a>
        <a href="index.html">🇭🇷</a>
        <a href="index-german.html">🇩🇪</a>
        <a href="index-italian.html">🇮🇹</a>
      </div>
    </div>
  );
}

export default Head;
