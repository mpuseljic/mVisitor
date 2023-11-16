import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";

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
        <Link to="/">
          <Flag country="US" />
        </Link>
        <Link to="/">
          <Flag country="HR" />
        </Link>
        <Link to="/italian">
          <Flag country="IT" />
        </Link>
        <Link to="/german">
          <Flag country="DE" />
        </Link>
      </div>
    </div>
  );
}

export default Head;
