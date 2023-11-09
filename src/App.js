import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
import Head from "./Head";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Head />
          <Form />
        </main>
      </div>
    </Router>
  );
}

export default App;
