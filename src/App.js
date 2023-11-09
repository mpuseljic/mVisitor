import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
import Head from "./Head";
import ItalianForm from "./ItalianForm";
import GermanForm from "./GermanForm";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Head />
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/italian" element={<ItalianForm />} />
            <Route path="/german" element={<GermanForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
